const apikey="4b4eeaf622d793c298c088a0d7ebdd7c";
const apiEndpoint="https://api.themoviedb.org/3";
const imgPath='https://image.tmdb.org/t/p/original';

const apiPaths={
    fetchAllCategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList:(id)=>`${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`
}

const init=()=>{
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())
    .then(res=>{
        const categories=res.genres;
        if(Array.isArray(categories)&&categories.length){
            categories.forEach(category=>{
                fetchAndBuildMovieSection(apiPaths.fetchMoviesList(category.id),category);
            })
        }
        console.table(categories);
    })
    .catch(err=>console.log(err))
}
const fetchAndBuildMovieSection=(fetchUrl,category)=>{
    // console.log(fetchUrl,category);
    fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        console.log(res.results)
        const movies=res.results;
        if(Array.isArray(movies)&& movies.length){
            buildMoviesSection(movies,category.name);
        }
    })
    .catch(err=>console.log('unable eto fetch api :('))
}
const buildMoviesSection=(list,categoryName)=>{
    console.log(list,categoryName);
    const moviesCont=document.getElementById('movies-cont');
    const moviesListHtml=list.map(item=>{
        return `
            <img class='movie-item' src='${imgPath}${item.backdrop_path}' alt='${item.title}'>
        `;
    }).join('');

    const moviesSectionHtml=`
        <h2 class="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All ></span></h2>
        <div class="movies-row">
            ${moviesListHtml}
        </div>
    `;

    console.log(moviesSectionHtml);
    const div=document.createElement('div');
    div.className='movies-section';
    div.innerHTML=moviesSectionHtml;

    moviesCont.append(div);


}
window.addEventListener('load',()=>{
    init();
})