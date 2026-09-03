
// Visualização da tela
// usa a variável do agenda.js



function alterarVisualizacao(tipo){

    filtroVisualizacao = tipo;

    abrirBanhoETosa();

    fecharBottomSheet();

}

function carregarBanhoETosa(){

    if(filtroVisualizacao === "diario"){

        carregarAgendamentosDoDia();

    }else{

        carregarAgendamentosDoMes();

    }

}

function carregarAgendamentosDoDia(){

    console.log("Modo diário");

}

function carregarAgendamentosDoMes(){

    console.log("Modo mensal");

}

function abrirFiltroBanhoETosa(){

    abrirBottomSheet(`

        <div class="filtro-banho">

            <h2>Filtros</h2>

            <div class="visualizacao-agenda">

                <button
                    class="${filtroVisualizacao=="diario"?"ativo":""}"
                    onclick="alterarVisualizacao('diario')">
                    Diário
                </button>

                <button
                    class="${filtroVisualizacao=="mensal"?"ativo":""}"
                    onclick="alterarVisualizacao('mensal')">
                    Mensal
                </button>

            </div>

            ${
                filtroVisualizacao=="diario"
                ? `
                    <div class="mini-calendario">

                        <h3>Calendário</h3>

                        ${miniCalendario()}

                    </div>
                `
                : ""
            }

            ${usuariosAgenda()}

            ${statusAgenda()}

            ${botao(
                "Aplicar",
                "fecharBottomSheet()"
            )}

        </div>

    `);

}


