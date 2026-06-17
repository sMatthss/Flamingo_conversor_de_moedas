// Seleção dos elementos do DOM
const valorUsuario = document.querySelector("#valor");
const moedaUsuario = document.querySelector("#moedas");
const btn = document.querySelector("#btn"); 
const divRes = document.querySelector(".display-res");
const divContainer = document.querySelector(".container");


btn.addEventListener("click", pegarMoeda);

function pegarMoeda() {
    const moeda = moedaUsuario.value;
    
    if (moeda === "default" || !valorUsuario.value) {
        alert("Por favor, preencha o valor e selecione uma moeda");
        return;
    }

    fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}`)
        .then(response => response.json())
        .then(data => {

            displayResultado(data, moeda);
        })
        .catch(error => {
            console.error("Erro ao buscar a cotação:", error);
        });
}

function displayResultado(data, moeda) {

    const chave = moeda.replace("-", "");

    const abreviacao = moeda.replace("-BRL", "$");
    
    const valorAtual = parseFloat(data[chave].bid);
    const valorDigitado = parseFloat(valorUsuario.value);
    
    const calculoCotação = valorDigitado * valorAtual;

    const cotaçãoFormatada = calculoCotação.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const nomeMoedaExibição = data[chave].name.split("/")[0];

    divRes.innerHTML = `
        <div class="resultado">
            <p>${abreviacao} ${valorDigitado}  = R$ ${valorAtual.toFixed(2)}</p>
            <p>${cotaçãoFormatada}</p>
        </div>
    `;

    divContainer.classList.add("style-container");
}