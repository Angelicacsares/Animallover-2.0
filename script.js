// ======================================================
// ANIMALLOVER
// SCRIPT.JS
// ------------------------------------------------------
// Controle geral da aplicação:
// • Menu lateral
// • Painel lateral
// • Navegação entre telas
// • Alteração do título
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

function fecharPainel(){
    painel.style.left = "-250px";
}

function abrirTela(nomeTela, html){
    alterarTitulo(nomeTela);
    conteudo.innerHTML = html;
    fecharPainel();
    fecharMenu();
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

    alterarTitulo("Início");

    conteudo.innerHTML = telaInicio();

    fecharPainel();
    fecharMenu();

    window.scrollTo(0, 0);

}

function telaInicio(){

      const banner = localStorage.getItem("bannerAnimallover") || "";


    return `

        <div class="cards">

            <div class="card" onclick="abrirBanhoTosa()">
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
        
        
        <div class="banner">

    ${
        banner
        ?
        `
            <img
                src="${banner}"
                class="imagem-banner"
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
        
        <div class="agendamentos">
            <h2>Agendamentos do dia</h2>
            <div class="caixa-agendamento">Nenhum agendamento até o momento</div>
            <div class="botao-agendamento">Ver todos os agendamentos</div>
        </div>

        <div class="pacotes">
            <h2>Pacotes para renovar</h2>
            <div class="caixa-pacote">Nenhum pacote até o momento</div>
            <div class="botao-pacote">Ver todos os pacotes</div>
        </div>

        <div class="contas-a-pagar">
            <h2>Contas a pagar do dia</h2>
            <div class="caixa-pagar">Nenhuma conta hoje</div>
            <div class="botao-pagar">Ver todas as contas</div>
        </div>

        <div class="contas-a-receber">
            <h2>Contas a receber do dia</h2>
            <div class="caixa-receber">Nenhum recebimento hoje</div>
            <div class="botao-receber">Ver todos os recebimentos</div>
        </div>

    `;
}


// ======================================================
// BANNER
// ======================================================

function escolherBanner(){

    document.getElementById("arquivoBanner").click();

}


function carregarBanner(event){

    const arquivo = event.target.files[0];

    if(!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function(){

        localStorage.setItem("bannerAnimallover", leitor.result);

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

    itens.forEach(function(item){

        html += `
            <div
                class="item-painel"
                onclick="${item.funcao}()"
            >
                ${item.icone} ${item.nome}
            </div>
        `;

    });

    painel.innerHTML = html;
    painel.style.left = "90px";

}

abrirInicio();
