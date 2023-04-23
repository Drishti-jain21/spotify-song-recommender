function main(){}

async function submitForm(ev){
    ev.preventDefault()
    const title1 = ev.currentTarget.elements.namedItem("title1").value;
    const artist1 = ev.currentTarget.elements.namedItem("artist1").value;
  
    const title2 = ev.currentTarget.elements.namedItem("title2").value;
    const artist2 = ev.currentTarget.elements.namedItem("artist2").value;
  
    const title3 = ev.currentTarget.elements.namedItem("title3").value;
    const artist3 = ev.currentTarget.elements.namedItem("artist3").value;
    console.log({title1,artist1})

    const recommendedSongs = await fetch(
        `/recommendations?${new URLSearchParams({
            title1,
            artist1,
            title2,
            artist2,
            title3,
            artist3,
        })}`
    ).then((res) => res.json())

    const songsListElement = document.getElementById("recommended-songs-list")

    songsListElement.innerHTML = recommendedSongs
        .slice(0,5)
        .map((song) =>{
            return(
                `<span class="rounded-md"><a href=${song.external_urls.spotify} type="__blank">${song.name}</a></span>` 
            )
        })
        .join("")
    const songsContainer = document.getElementById("songs-container");
    songsContainer.scrollIntoView();
} 

