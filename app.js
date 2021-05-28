/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html. Done

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova. Done

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis. Done

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

let recipes;
let actualRecipes = [];
let buttonSearch = document.getElementById('searchBtn');
let inputSearch = document.getElementById('hledat');
let selectedRecipe;
let initialRecipe = localStorage.selectedRecipe;
let recipesElement = document.getElementById('recepty');
initialLoad();

console.log(recipes);

function searchMeal(){
    let updatedRecipes = [];
    for(let index in recipes)
    {
        console.log(recipes[index].nadpis.search(inputSearch.textContent));

        let stringToProcess = recipes[index].nadpis.toLowerCase().search(inputSearch.textContent);
        if(stringToProcess != -1)
        {
            updatedRecipes.push(recipes[index]);
        }
    }
    console.log(updatedRecipes);

    reloadPage(updatedRecipes);
}

function changeSearchInput(e) {
    reloadList();
    inputSearch.textContent = e.target.value.toLowerCase();
    console.log(e.target.value);
}

function showDetail(recipe){
    {
        let image =  document.getElementById('recept-foto');
        image.src = recipe.img;

        let categoryTitle = document.getElementById('recept-kategorie');
        console.log(categoryTitle);
        categoryTitle.textContent = recipe.kategorie;

        let valuationTitle = document.getElementById('recept-hodnoceni');
        console.log(valuationTitle);
        valuationTitle.textContent = recipe.hodnoceni;
        
        let nazevTitle = document.getElementById('recept-nazev');
        nazevTitle.textContent = recipe.nadpis;
        
        let popisTitle = document.getElementById('recept-popis');
        popisTitle.textContent = recipe.popis;
    }
}

function reloadPage(recipesUpdated){
    recipesElement.innerHTML = "";
    for(let index in recipesUpdated)
    {
        let divRecept = document.createElement('div');
        divRecept.classList.add('recept');

        let divObrazek = document.createElement('div');
        divObrazek.classList.add('recept-obrazek');

        let img = document.createElement('img');
        img.src = recipesUpdated[index].img;
        img.alt = "Obrazek " + recipesUpdated[index].toString();
        divObrazek.appendChild(img);

        divInfo = document.createElement('div');
        divInfo.classList.add('recept-info');

        let h3 = document.createElement('h3');
        h3.innerText = recipesUpdated[index].nadpis;
        divInfo.appendChild(h3);

        divRecept.appendChild(divObrazek);
        divRecept.appendChild(divInfo);
        
        divRecept.onclick = function() {
            showDetail(recipesUpdated[index]);
        };

        recipesElement.appendChild(divRecept);
    }
}

function initialLoad(){
    reloadList();
}

function reloadList(){
    recipes = recepty;

    for(let index in recipes )
    {
        let divRecept = document.createElement('div');
        divRecept.classList.add('recept');

        let divObrazek = document.createElement('div');
        divObrazek.classList.add('recept-obrazek');

        let img = document.createElement('img');
        img.src = recipes[index].img;
        img.alt = "Obrazek " + recipes[index].toString();
        divObrazek.appendChild(img);

        divInfo = document.createElement('div');
        divInfo.classList.add('recept-info');

        let h3 = document.createElement('h3');
        h3.innerText = recipes[index].nadpis;
        divInfo.appendChild(h3);

        divRecept.appendChild(divObrazek);
        divRecept.appendChild(divInfo);
        
        divRecept.onclick = function() {
            showDetail(recipes[index]);
        };

        recipesElement.appendChild(divRecept);
    }
}

function setByCategory(){
    updatedList = [];
    console.log("selected!");

    for(let index in recipes)
    {
        if(recipes[index] == category)
        {
            updatedList.push(recipes[index]);
        }
    }
    reloadPage(updatedList);
}