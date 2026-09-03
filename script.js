// ======================================================
// ANIMALLOVER
// SCRIPT.JS
// ------------------------------------------------------
// Controle geral da aplicação
// • Menu lateral
// • Painel lateral
// • Navegação
// • Tela inicial
// • Banner
// ======================================================


// ======================================================
// VARIÁVEIS GLOBAIS
// ======================================================

const menu = document.getElementById("menu");
const painel = document.getElementById("painel");
const conteudo = document.getElementById("conteudo");
const titulo = document.querySelector(".titulo");

let menuAberto = false;


// ======================================================
// FUNÇÕES GERAIS
// ======================================================

function alterarTitulo(texto){

    titulo.textContent = texto;

}


// Destaca o item ativo do menu
function atualizarMenuAtivo(nomeFuncao){

    document
        .querySelectorAll(".lista-menu li")
        .forEach(li => li.classList.remove("ativo"));

    const item = document.querySelector(
        `.lista-menu li[onclick="${nomeFuncao}()"]`
    );

    if(item){

        item.classList.add("ativo");

    }

}


// Finaliza a troca de telas
function finalizarTrocaTela(){

    fecharPainel();
    fecharMenu();

    window.scrollTo(0,0);

}


function fecharPainel(){

    painel.style.left = "-250px";

}


function abrirTela(nomeTela, html){

    alterarTitulo(nomeTela);

    conteudo.innerHTML = html;

    const botaoFiltro =
        document.getElementById("botaoFiltro");

    if(nomeTela === "Calendário"){

    botaoFiltro.style.display = "flex";
    botaoFiltro.onclick = abrirFiltrosAgenda;

}
else if(nomeTela === "Banho e Tosa"){

    botaoFiltro.style.display = "flex";
    botaoFiltro.onclick = abrirFiltroBanhoETosa;

}
else if(nomeTela === "Pacotes"){

    botaoFiltro.style.display = "flex";
    botaoFiltro.onclick = abrirFiltrosPacotes;

}
else{

    botaoFiltro.style.display = "none";

}

    

    finalizarTrocaTela();

}

// ======================================================
// MENU LATERAL
// ======================================================

function abrirMenu(){

    menu.style.left = "0";

    menuAberto = true;

}


function fecharMenu(){

    menu.style.left = "-90px";

    menuAberto = false;

}


function alternarMenu(){

    if(menuAberto){

        fecharMenu();
        fecharPainel();

    }else{

        abrirMenu();

    }

}


// ======================================================
// TELA INICIAL
// ======================================================

function abrirInicio(){

    atualizarMenuAtivo("abrirInicio");

    abrirTela(
        "Início",
        telaInicio()
    );

}

// ======================================================
// COMPONENTES DA TELA INICIAL
// ======================================================

function cardsInicio(){

    return `

        <div class="cards">

            <div class="card" onclick="abrirBanhoETosa()">
                <h2>
                    <span class="material-symbols-rounded">
                        content_cut
                    </span>
                </h2>
                <p>Cadastrar Banho</p>
            </div>

            <div class="card" onclick="abrirPacotes()">
                <h2>
                    <span class="material-symbols-rounded">
                        inventory_2
                    </span>
                </h2>
                <p>Cadastrar Pacote</p>
            </div>

            <div class="card" onclick="abrirNovoCliente()">
                <h2>
                    <span class="material-symbols-rounded">
                        groups
                    </span>
                </h2>
                <p>Cadastrar Cliente</p>
            </div>
            <div class="card" onclick="abrirFinanceiro()">
                <h2>
                    <span class="material-symbols-rounded">
                        account_balance_wallet
                    </span>
                </h2>
                <p>Contas a Receber</p>
            </div>

            <div class="card" onclick="abrirRelatorios()">
                <h2>
                    <span class="material-symbols-rounded">
                        calculate
                    </span>
                </h2>
                <p>Fechamento Diário</p>
            </div>

            <div class="card" onclick="abrirFinanceiro()">
                <h2>
                    <span class="material-symbols-rounded">
                        trending_down
                    </span>
                </h2>
                <p>Minhas Despesas</p>
            </div>

        </div>

    `;

}

function componenteBanner(){

    const banner =
        localStorage.getItem("bannerAnimallover") || "";

    return `

        <div class="banner">

            ${
                banner
                ?
                `
                    <img
                        src="${banner}"
                        class="imagem-banner"
                        alt="Banner do Animallover"
                    >
                `
                :
                `
                    <div
                        class="banner-vazio"
                        onclick="escolherBanner()"
                    >

                        <span>📷</span>

                        <p>Adicionar banner</p>

                    </div>
                `
            }

            <input
                type="file"
                id="arquivoBanner"
                accept="image/*"
                hidden
                onchange="carregarBanner(event)"
            >

        </div>

    `;

}

// ======================================================
// BLOCOS DA TELA INICIAL
// ======================================================

function agendamentosHoje(){

    return `

        <div class="agendamentos">

            <h2>Agendamentos do dia</h2>

            <div class="caixa-agendamento">

                Nenhum agendamento até o momento

            </div>

            <div class="botao-agendamento">

                Ver todos os agendamentos

            </div>

        </div>

    `;

}


function pacotesHoje(){

    return `

        <div class="pacotes">

            <h2>Pacotes para renovar</h2>

            <div class="caixa-pacote">

                Nenhum pacote até o momento

            </div>

            <div class="botao-pacote">

                Ver todos os pacotes

            </div>

        </div>

    `;

}


function contasPagarHoje(){

    return `

        <div class="contas-a-pagar">

            <h2>Contas a pagar do dia</h2>

            <div class="caixa-pagar">

                Nenhuma conta hoje

            </div>

            <div class="botao-pagar">

                Ver todas as contas

            </div>

        </div>

    `;

}


function contasReceberHoje(){

    return `

        <div class="contas-a-receber">

            <h2>Contas a receber do dia</h2>

            <div class="caixa-receber">

                Nenhum recebimento hoje

            </div>

            <div class="botao-receber">

                Ver todos os recebimentos

            </div>

        </div>

    `;

}


// ======================================================
// TELA INICIAL
// ======================================================

function telaInicio(){

    return `

        ${cardsInicio()}

        ${componenteBanner()}

        ${agendamentosHoje()}

        ${pacotesHoje()}

        ${contasPagarHoje()}

        ${contasReceberHoje()}

    `;

}

// ======================================================
// BANNER
// ======================================================

function escolherBanner(){

    const input = document.getElementById("arquivoBanner");

    if(input){

        input.click();

    }

}


function carregarBanner(event){

    const arquivo = event.target.files[0];

    if(!arquivo){

        return;

    }

    const leitor = new FileReader();

    leitor.onload = function(){

        localStorage.setItem(
            "bannerAnimallover",
            leitor.result
        );

        abrirInicio();

    };

    leitor.readAsDataURL(arquivo);

}


// ======================================================
// PAINEL LATERAL
// ======================================================

function mostrarPainel(tituloPainel, itens){

    let html = `

        <h2 class="titulo-painel">

            ${tituloPainel}

        </h2>

    `;

    itens.forEach(item => {

        html += `

            <div
                class="item-painel"
                onclick="${item.funcao}()"
            >

                ${item.icone}

                <span>

                    ${item.nome}

                </span>

            </div>

        `;

    });

    painel.innerHTML = html;

    painel.style.left = "90px";

}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    abrirInicio();

});