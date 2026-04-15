(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const M="0425155b8emsh39896c866f49b2fp1dd25ejsnf1055ad29905",u="https://api.themoviedb.org/3",v="utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com";async function p(e){const t=await fetch(e,{method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${TMDB_TOKEN}`}});if(!t.ok)throw new Error(`TMDb request failed: ${t.status}`);return t.json()}async function L(e){const t=`${u}/search/movie?query=${encodeURIComponent(e)}`;return(await p(t)).results||[]}async function N(e){const t=`${u}/movie/${e}`;return p(t)}async function _(e){const t=`${u}/movie/${e}/external_ids`;return(await p(t)).imdb_id||null}async function E(e){if(!e)return[];const t=`https://${v}/idlookup?source_id=${encodeURIComponent(e)}&source=imdb&country=us`,o=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json","x-rapidapi-host":v,"x-rapidapi-key":M}});if(!o.ok)throw new Error(`Utelly request failed: ${o.status}`);return(await o.json()).collection?.locations||[]}function g(e){return e?e.split("-")[0]:"N/A"}function h(e){return e==null||Number.isNaN(Number(e))?"N/A":Number(e).toFixed(1)}function S(e,t=160){return e?e.length<=t?e:`${e.slice(0,t)}...`:"No description available."}const y="https://image.tmdb.org/t/p/w500";function T(e){const t=document.querySelector("#movie-results");if(t.innerHTML="",!e.length){t.innerHTML="<p>No movies found.</p>";return}const o=e.map(r=>{const n=r.poster_path?`${y}${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image";return`
        <article class="movie-card" data-id="${r.id}">
          <img src="${n}" alt="${r.title} poster">
          <div class="movie-info">
            <h2>${r.title}</h2>
            <div class="movie-meta">
              <p><strong>Year:</strong> ${g(r.release_date)}</p>
              <p><strong>Rating:</strong> ${h(r.vote_average)}</p>
            </div>
            <p class="movie-overview">${S(r.overview)}</p>
          </div>
        </article>
      `}).join("");t.innerHTML=o}function c(e){document.querySelector("#status-message").textContent=e}function q(){document.querySelectorAll(".movie-card").forEach(t=>{t.addEventListener("click",async()=>{const o=t.dataset.id;await I(o)})})}async function I(e){const t=document.querySelector("#movie-modal"),o=document.querySelector("#modal-content");t.showModal(),o.innerHTML="<p>Loading movie details...</p>";try{const r=await N(e),n=await _(e),s=await E(n),i=r.poster_path?`${y}${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image";let f="<p>No streaming info available.</p>";s.length>0&&(f=`
        <div class="providers">
          ${s.map(a=>{const w=a.display_name||"Unknown Provider";return`
                <span class="provider">
                  <a class="provider-link" href="${a.url||"#"}" target="_blank" rel="noopener noreferrer">
                    ${w}
                  </a>
                </span>
              `}).join("")}
        </div>
      `),o.innerHTML=`
      <img src="${i}" alt="${r.title} poster">
      <h2>${r.title}</h2>

      <div class="modal-meta">
        <p><strong>Year:</strong> ${g(r.release_date)}</p>
        <p><strong>Rating:</strong> ${h(r.vote_average)}</p>
        <p><strong>Runtime:</strong> ${r.runtime?`${r.runtime} minutes`:"N/A"}</p>
        <p><strong>Genres:</strong> ${r.genres&&r.genres.length?r.genres.map(a=>a.name).join(", "):"N/A"}</p>
        <p><strong>IMDb ID:</strong> ${n||"N/A"}</p>
      </div>

      <p>${r.overview||"No description available."}</p>

      <h3>Streaming Platforms</h3>
      ${f}
    `}catch(r){console.error(r),o.innerHTML="<p>Error loading movie details.</p>"}}function A(e,t){return e.filter(o=>o.vote_average>=t)}function B(e,t){const o=[...e];return t==="rating"?o.sort((r,n)=>n.vote_average-r.vote_average):t==="year"?o.sort((r,n)=>{const s=Number((r.release_date||"0").slice(0,4));return Number((n.release_date||"0").slice(0,4))-s}):o.sort((r,n)=>n.popularity-r.popularity)}const R=document.querySelector("#search-form"),D=document.querySelector("#search-input"),$=document.querySelector("#min-rating"),b=document.querySelector("#sort-by"),l=document.querySelector("#movie-modal"),j=document.querySelector("#close-modal");let d=[];R.addEventListener("submit",async e=>{e.preventDefault();const t=D.value.trim();if(!t){c("Please enter a movie name.");return}c("Loading movies...");try{d=await L(t),m(),c(`Found ${d.length} movie(s).`)}catch(o){console.error(o),c("There was a problem loading movie data.")}});$.addEventListener("change",m);b.addEventListener("change",m);j.addEventListener("click",()=>{l.close()});l.addEventListener("click",e=>{const t=l.getBoundingClientRect();e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom||l.close()});function m(){const e=Number($.value),t=b.value;let o=A(d,e);o=B(o,t),T(o),q()}
