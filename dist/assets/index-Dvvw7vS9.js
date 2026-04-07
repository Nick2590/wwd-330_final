(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const M="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBlZjI1YzUzZWEwYTMxMmI2ZTA5YTA5NmVhNDdmMyIsIm5iZiI6MTc3NTE3MzA2NS42NDcsInN1YiI6IjY5Y2VmZGM5Nzk0Y2EzODQ0NjBiOGQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nPRd7dALWzT_2-mKKtCDRwV208ekZmbtC0k3EAnIpzI",u="https://api.themoviedb.org/3";async function p(e){const t=await fetch(e,{method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${M}`}});if(!t.ok)throw new Error("Failed to fetch data.");return await t.json()}async function $(e){const t=`${u}/search/movie?query=${encodeURIComponent(e)}`;return(await p(t)).results||[]}async function N(e){const t=`${u}/movie/${e}`;return await p(t)}async function I(e){const t=`${u}/movie/${e}/watch/providers`;return(await p(t)).results?.US||null}function f(e){return e?e.split("-")[0]:"N/A"}function v(e){return e==null?"N/A":Number(e).toFixed(1)}function w(e,t=160){return e?e.length<=t?e:e.slice(0,t)+"...":"No description available."}const g="https://image.tmdb.org/t/p/w500";function L(e){const t=document.querySelector("#movie-results");if(t.innerHTML="",!e.length){t.innerHTML="<p>No movies found.</p>";return}const n=e.map(r=>{const o=r.poster_path?`${g}${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image";return`
        <article class="movie-card" data-id="${r.id}">
          <img src="${o}" alt="${r.title} poster">
          <div class="movie-info">
            <h2>${r.title}</h2>
            <div class="movie-meta">
              <p><strong>Year:</strong> ${f(r.release_date)}</p>
              <p><strong>Rating:</strong> ${v(r.vote_average)}</p>
            </div>
            <p class="movie-overview">${w(r.overview)}</p>
          </div>
        </article>
      `}).join("");t.innerHTML=n}function a(e){document.querySelector("#status-message").textContent=e}function S(){document.querySelectorAll(".movie-card").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.id;await b(n)})})}async function b(e){const t=document.querySelector("#movie-modal"),n=document.querySelector("#modal-content");t.showModal(),n.innerHTML="<p>Loading movie details...</p>";try{const r=await N(e),o=await I(e),i=r.poster_path?`${g}${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image";let s="<p>No streaming info available.</p>";o&&o.flatrate&&o.flatrate.length>0&&(s=`
        <div class="providers">
          ${o.flatrate.map(l=>`<span class="provider">${l.provider_name}</span>`).join("")}
        </div>
      `),n.innerHTML=`
      <img src="${i}" alt="${r.title} poster">
      <h2>${r.title}</h2>
      <div class="modal-meta">
        <p><strong>Year:</strong> ${f(r.release_date)}</p>
        <p><strong>Rating:</strong> ${v(r.vote_average)}</p>
        <p><strong>Runtime:</strong> ${r.runtime?r.runtime+" minutes":"N/A"}</p>
        <p><strong>Genres:</strong> ${r.genres&&r.genres.length?r.genres.map(l=>l.name).join(", "):"N/A"}</p>
      </div>
      <p>${r.overview||"No description available."}</p>
      <h3>Streaming Platforms</h3>
      ${s}
    `}catch(r){n.innerHTML="<p>Error loading movie details.</p>",console.error(r)}}function E(e,t){return e.filter(n=>n.vote_average>=t)}function T(e,t){const n=[...e];return t==="rating"?n.sort((r,o)=>o.vote_average-r.vote_average):t==="year"?n.sort((r,o)=>{const i=Number((r.release_date||"0").slice(0,4));return Number((o.release_date||"0").slice(0,4))-i}):n.sort((r,o)=>o.popularity-r.popularity)}const _=document.querySelector("#search-form"),A=document.querySelector("#search-input"),h=document.querySelector("#min-rating"),y=document.querySelector("#sort-by"),c=document.querySelector("#movie-modal"),q=document.querySelector("#close-modal");let d=[];_.addEventListener("submit",async e=>{e.preventDefault();const t=A.value.trim();if(!t){a("Please enter a movie name.");return}a("Loading movies...");try{d=await $(t),m(),a(`Found ${d.length} movie(s).`)}catch(n){console.error(n),a("There was a problem loading movie data.")}});h.addEventListener("change",m);y.addEventListener("change",m);q.addEventListener("click",()=>{c.close()});c.addEventListener("click",e=>{const t=c.getBoundingClientRect();e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom||c.close()});function m(){const e=Number(h.value),t=y.value;let n=E(d,e);n=T(n,t),L(n),S()}
