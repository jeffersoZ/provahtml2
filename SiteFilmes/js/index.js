document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'a6c2f684ce7759a18ebc13e0c07a0419'; // Sua chave TMDB
    const searchBtn = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('resultsContainer');

    searchBtn.addEventListener('click', buscarFilmes);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') buscarFilmes();
    });

    function buscarFilmes() {
        const query = searchInput.value.trim();
        if (!query) return;

        resultsDiv.innerHTML = '<p>Carregando...</p>';
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`)
            .then(res => res.json())
            .then(data => {
                resultsDiv.innerHTML = '';
                
                if (data.results.length === 0) {
                    resultsDiv.innerHTML = '<p>Nenhum filme encontrado</p>';
                    return;
                }

                data.results.forEach(filme => {
                    const poster = filme.poster_path 
                        ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
                        : 'https://via.placeholder.com/200x300?text=Sem+Poster';
                    
                    resultsDiv.innerHTML += `
                        <div class="filme">
                            <img src="${poster}" alt="${filme.title}">
                            <h3>${filme.title}</h3>
                            <p>${filme.release_date || 'Sem data'}</p>
                        </div>
                    `;
                });
            })
            .catch(err => {
                console.error(err);
                resultsDiv.innerHTML = '<p>Erro na busca</p>';
            });
    }
});