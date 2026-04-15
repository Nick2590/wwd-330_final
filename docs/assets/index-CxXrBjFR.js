(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const b="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBlZjI1YzUzZWEwYTMxMmI2ZTA5YTA5NmVhNDdmMyIsIm5iZiI6MTc3NTE3MzA2NS42NDcsInN1YiI6IjY5Y2VmZGM5Nzk0Y2EzODQ0NjBiOGQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nPRd7dALWzT_2-mKKtCDRwV208ekZmbtC0k3EAnIpzI",p="https://api.themoviedb.org/3";async function f(e){const t=await fetch(e,{method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${b}`}});if(!t.ok)throw new Error(`TMDb request failed: ${t.status}`);return t.json()}async function I(e){const t=`${p}/search/movie?query=${encodeURIComponent(e)}`;return(await f(t)).results||[]}async function w(e){const t=`${p}/movie/${e}`;return f(t)}async function L(e){const t=`${p}/movie/${e}/watch/providers`,n=await f(t);return n.results?.US?n.results.US:Object.values(n.results||{})[0]||null}function h(e){return e?e.split("-")[0]:"N/A"}function y(e){return e==null||Number.isNaN(Number(e))?"N/A":Number(e).toFixed(1)}function S(e,t=160){return e?e.length<=t?e:`${e.slice(0,t)}...`:"No description available."}const N="https://image.tmdb.org/t/p/w500";function E(e){const t=document.querySelector("#movie-results");if(t.innerHTML="",!e.length){t.innerHTML="<p>No movies found.</p>";return}const n=e.map(r=>{const o=r.poster_path?`${N}${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image";return`
        <article class="movie-card" data-id="${r.id}">
          <img src="${o}" alt="${r.title} poster">
          <div class="movie-info">
            <h2>${r.title}</h2>
            <div class="movie-meta">
              <p><strong>Year:</strong> ${h(r.release_date)}</p>
              <p><strong>Rating:</strong> ${y(r.vote_average)}</p>
            </div>
            <p class="movie-overview">${S(r.overview)}</p>
          </div>
        </article>
      `}).join("");t.innerHTML=n}function c(e){document.querySelector("#status-message").textContent=e}function T(){document.querySelectorAll(".movie-card").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.id;await _(n)})})}async function _(e){const t=document.querySelector("#movie-modal"),n=document.querySelector("#modal-content");t.showModal(),n.innerHTML="<p>Loading movie details...</p>";try{const r=await w(e),o=await L(e),s=r.poster_path?`${N}${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image";let i="<p>No streaming info available.</p>";if(o){const u=[...o.flatrate||[],...o.rent||[],...o.buy||[]],d=[],g=new Set;u.forEach(a=>{g.has(a.provider_name)||(g.add(a.provider_name),d.push(a))}),d.length>0&&(i=`
          <div class="providers">
            ${d.map(a=>`
                  <span class="provider">${a.provider_name}</span>
                `).join("")}
          </div>
        `)}n.innerHTML=`
      <img src="${s}" alt="${r.title} poster">
      <h2>${r.title}</h2>

      <div class="modal-meta">
        <p><strong>Year:</strong> ${h(r.release_date)}</p>
        <p><strong>Rating:</strong> ${y(r.vote_average)}</p>
        <p><strong>Runtime:</strong> ${r.runtime?`${r.runtime} minutes`:"N/A"}</p>
        <p><strong>Genres:</strong> ${r.genres&&r.genres.length?r.genres.map(u=>u.name).join(", "):"N/A"}</p>
      </div>

      <p>${r.overview||"No description available."}</p>

      <h3>Streaming Platforms</h3>
      ${i}
    `}catch(r){console.error(r),n.innerHTML="<p>Error loading movie details.</p>"}}function q(e,t){return e.filter(n=>n.vote_average>=t)}function A(e,t){const n=[...e];return t==="rating"?n.sort((r,o)=>o.vote_average-r.vote_average):t==="year"?n.sort((r,o)=>{const s=Number((r.release_date||"0").slice(0,4));return Number((o.release_date||"0").slice(0,4))-s}):n.sort((r,o)=>o.popularity-r.popularity)}const R=document.querySelector("#search-form"),B=document.querySelector("#search-input"),$=document.querySelector("#min-rating"),M=document.querySelector("#sort-by"),l=document.querySelector("#movie-modal"),D=document.querySelector("#close-modal");let m=[];R.addEventListener("submit",async e=>{e.preventDefault();const t=B.value.trim();if(!t){c("Please enter a movie name.");return}c("Loading movies...");try{m=await I(t),v(),c(`Found ${m.length} movie(s).`)}catch(n){console.error(n),c("There was a problem loading movie data.")}});$.addEventListener("change",v);M.addEventListener("change",v);D.addEventListener("click",()=>{l.close()});l.addEventListener("click",e=>{const t=l.getBoundingClientRect();e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom||l.close()});function v(){const e=Number($.value),t=M.value;let n=q(m,e);n=A(n,t),E(n),T()}
