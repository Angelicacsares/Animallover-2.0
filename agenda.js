// ======================================================
// ANIMALLOVER
// AGENDA.JSss
// ======================================================

let agendamentos = JSON.parse(
    localStorage.getItem("agendamentos")
) || [];

let modoCalendario = "diario";

let dataSelecionada = new Date();

let filtroVisualizacao = "diario";

let filtrosAgenda = {

    visualizacao: "diario",

    pesquisa: "",

    responsavel: "",

    status: "",

    financeiro: "",

    petTaxi: ""

};

let diaSelecionado = null;

let pacotes = JSON.parse(
    localStorage.getItem("pacotes")
) || [];

// ======================================================
// MENU
// ======================================================

function abrirAgenda(){
 
 atualizarMenuAtivo("abrirAgenda");
    mostrarPainel("Agenda",[

        {
            icone:"<span class='material-symbols-rounded'>calendar_month</span>",
            nome:"Calendário",
            funcao:"abrirCalendario"
        },

        {
            icone:"<span class='material-symbols-rounded'>content_cut</span>",
            nome:"Banho e Tosa",
            funcao:"abrirBanhoETosa"
        },

        {
            icone:"<span class='material-symbols-rounded'>redeem</span>",
            nome:"Pacotes",
            funcao:"abrirPacotes"
        },

        {
            icone:"<span class='material-symbols-rounded'>checklist</span>",
            nome:"Checklist",
            funcao:"abrirChecklist"
        }

    ]);

}



// ======================================================
// CALENDÁRIO
// ======================================================

function abrirCalendario(){

    abrirTela(

        "Calendário",

        telaCalendario()

    );

}

function telaCalendario(){

    return `

        ${barraCalendario()}

        ${campoBusca("Buscar agendamento")}

        <div id="areaAgenda">

            ${renderizarCalendario()}

        </div>

        ${botaoNovo("novoAgendamento")}

    `;

}

function abrirFiltrosAgenda(){

    abrirBottomSheet(

        telaFiltrosAgenda()

    );

}


function telaFiltrosAgenda(){

    return `

        ${campoSelect(
            "Visualização",
            "visualizacaoAgenda",
            [
                "Diário",
                "Semanal",
                "Mensal"
            ]
        )}

        ${campoBusca("Buscar")}

        <div class="mini-calendario">

            <h3>Calendário</h3>

            ${miniCalendario()}

        </div>

        ${usuariosAgenda()}

        ${statusAgenda()}

        ${botao(
            "Filtrar",
            "aplicarFiltrosAgenda()"
        )}

    `;

}

function usuariosAgenda(){

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    let html = `

        <div class="usuarios-agenda">

            <h3>Usuários</h3>

    `;

    usuarios.forEach((usuario, i)=>{

        html += `

            <label class="opcao-filtro">

                <input
                    type="radio"
                    name="responsavelAgenda"
                    value="${usuario.nome}"
                    ${i===0?"checked":""}
                >

                <span>${usuario.nome}</span>

            </label>

        `;

    });

    html += `

        <label class="opcao-filtro">

            <input
                type="radio"
                name="responsavelAgenda"
                value=""
            >

            <span>Sem responsável</span>

        </label>

        </div>

    `;

    return html;

}

function marcarTodosStatus(checkbox){

    const lista = document.querySelectorAll(
        '.status-agenda input[type="checkbox"]'
    );

    lista.forEach(item => {
        item.checked = checkbox.checked;
    });

}

function statusAgenda(){

    const status = [

        "Todos",
        "Aguardando confirmação",
        "Agendado",
        "Concluído",
        "Cancelado"

    ];

    let html = `

        <div class="status-agenda">

            <h3>Status</h3>

    `;

    status.forEach((item, i) => {

        html += `

            <label class="opcao-filtro">

                <input
                    type="checkbox"
                    checked
                    ${i === 0 ? 'onchange="marcarTodosStatus(this)"' : ""}
                >

                <span>${item} (0)</span>

            </label>

        `;

    });

    html += `</div>`;

    return html;

}


function miniCalendario() {

    const meses = [
        "Janeiro","Fevereiro","Março",
        "Abril","Maio","Junho",
        "Julho","Agosto","Setembro",
        "Outubro","Novembro","Dezembro"
    ];

    const diasSemana = [
        "Dom","Seg","Ter","Qua","Qui","Sex","Sáb"
    ];

    const ano = dataSelecionada.getFullYear();
    const mes = dataSelecionada.getMonth();

    const primeiroDia = new Date(ano, mes, 1);

    const ultimoDia = new Date(ano, mes + 1, 0);

    const primeiroDiaSemana = primeiroDia.getDay();

    const totalDias = ultimoDia.getDate();

    const hoje = new Date();

    let html = `

        <div class="cabecalho-mini-calendario">

            <button onclick="mesAnterior()">

                <span class="material-symbols-rounded">
                    chevron_left
                </span>

            </button>

            <strong>

                ${meses[mes]} ${ano}

            </strong>

            <button onclick="proximoMes()">

                <span class="material-symbols-rounded">
                    chevron_right
                </span>

            </button>

        </div>

        <div class="dias-semana">

    `;

    diasSemana.forEach(dia => {

        html += `<div>${dia}</div>`;

    });

    html += `</div><div class="grade-calendario">`;

    for (let i = 0; i < primeiroDiaSemana; i++) {

        html += `<div></div>`;

    }

    for (let dia = 1; dia <= totalDias; dia++) {

        let classe = "";

if (
    dia === hoje.getDate() &&
    mes === hoje.getMonth() &&
    ano === hoje.getFullYear()
){
    classe += " hoje";
}

if(dia === diaSelecionado){
    classe += " selecionado";
}

        html += `

            <button
                class="dia-calendario ${classe}"
                onclick="selecionarDia(${dia})"
            >

                ${dia}

            </button>

        `;

    }

    html += `</div>`;

    return html;

}

function atualizarMiniCalendario(){

    const calendario = document.querySelector(".mini-calendario");

    if(!calendario) return;

    calendario.innerHTML = `

        <h3>Calendário</h3>

        ${miniCalendario()}

    `;

}

function selecionarDia(dia){

    diaSelecionado = dia;

    dataSelecionada.setDate(dia);

    atualizarCalendario();

}

function selecionarData(data){

    dataSelecionada = new Date(data);

    diaSelecionado = dataSelecionada.getDate();

    atualizarCalendario();

}

function aplicarFiltrosAgenda(){

    const visualizacao =
        document.getElementById("visualizacaoAgenda");

    if(visualizacao){

        filtrosAgenda.visualizacao =
            visualizacao.value.toLowerCase();

    }

    document.getElementById("areaAgenda").innerHTML =
        renderizarCalendario();

    fecharBottomSheet();

}

function calendarioDiario(){

    return `

        <div class="agenda-diaria">

            ${cabecalhoSemana()}

            <div class="titulo-data">

                ${tituloDataSelecionada()}

            </div>

            <div class="grade-dia">

                ${linhasHorario()}

            </div>

        </div>

    `;

}

function cabecalhoSemana(){

    const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const diaBase = diaSelecionado || dataSelecionada.getDate();

    const dataBase = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth(),
        diaBase
    );

    const domingo = new Date(dataBase);
    domingo.setDate(dataBase.getDate() - dataBase.getDay());

    let html = `<div class="cabecalho-semana">`;

    for(let i = 0; i < 7; i++){

        const d = new Date(domingo);
        d.setDate(domingo.getDate() + i);

        const ativo =
            d.getDate() === dataBase.getDate() &&
            d.getMonth() === dataBase.getMonth() &&
            d.getFullYear() === dataBase.getFullYear();

        html += `

            <div class="dia-semana ${ativo ? "ativo" : ""}">

                <small>${dias[i]}</small>

                <button onclick="selecionarData('${d.toISOString()}')">
                    ${d.getDate()}
                </button>

            </div>

        `;

    }

    html += `</div>`;

    return html;

}

function tituloDataSelecionada(){

    const dia = diaSelecionado || dataSelecionada.getDate();

    const data = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth(),
        dia
    );

    return data.toLocaleDateString("pt-BR",{
        day:"numeric",
        month:"long",
        year:"numeric"
    });

}

function linhasHorario(){

    let html="";

    for(let h=8;h<=19;h++){

        html+=`

            <div class="linha-agenda">

                <div class="hora-agenda">

                    ${String(h).padStart(2,"0")}:00

                </div>

                <div class="conteudo-hora"></div>

            </div>

            <div class="linha-agenda">

                <div class="hora-agenda">

                    ${String(h).padStart(2,"0")}:30

                </div>

                <div class="conteudo-hora"></div>

            </div>

        `;

    }

    return html;

}

function calendarioSemanal(){

    return `

        <div class="agenda-semanal">

            <div class="titulo-data">

                ${tituloSemana()}

            </div>

            <div class="grade-semanal">

                ${gradeSemanal()}

            </div>

        </div>

    `;

}

function gradeSemanal(){

    const dias = [
        "Dom.","Seg.","Ter.","Qua.","Qui.","Sex.","Sáb."
    ];

    let html = `

        <div class="linha-semanal cabecalho-semanal">

            <div class="hora-agenda vazio"></div>

    `;

    dias.forEach(dia => {

        html += `
            <div class="dia-cabecalho">
                ${dia}
            </div>
        `;

    });

    html += `</div>`;

    for(let h = 8; h <= 19; h++){

        ["00","30"].forEach(min => {

            html += `

                <div class="linha-semanal">

                    <div class="hora-agenda">

                        ${String(h).padStart(2,"0")}:${min}

                    </div>

                    <div class="celula-dia"></div>
                    <div class="celula-dia"></div>
                    <div class="celula-dia"></div>
                    <div class="celula-dia"></div>
                    <div class="celula-dia"></div>
                    <div class="celula-dia"></div>
                    <div class="celula-dia"></div>

                </div>

            `;

        });

    }

    return html;

}

function tituloSemana(){

    const inicio = new Date(dataSelecionada);
    inicio.setDate(inicio.getDate() - inicio.getDay());

    const fim = new Date(inicio);
    fim.setDate(fim.getDate() + 6);

    return `${inicio.getDate()} a ${fim.getDate()} de ${fim.toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}`;

}

function calendarioMensal(){

    return `

        <div class="agenda-mensal">

            <div class="titulo-data">

                ${dataSelecionada.toLocaleDateString(
                    "pt-BR",
                    {
                        month:"long",
                        year:"numeric"
                    }
                )}

            </div>

            ${cabecalhoDiasSemanaMensal()}

            <div class="grade-mensal">

                ${diasMes()}

            </div>

        </div>

    `;

}

function cabecalhoDiasSemanaMensal(){

    return `

        <div class="cabecalho-mensal">

            <div>Dom.</div>
            <div>Seg.</div>
            <div>Ter.</div>
            <div>Qua.</div>
            <div>Qui.</div>
            <div>Sex.</div>
            <div>Sáb.</div>

        </div>

    `;

}

function diasMes(){

    const ano = dataSelecionada.getFullYear();
    const mes = dataSelecionada.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const primeiroDiaSemana = primeiroDia.getDay();
    const totalDias = ultimoDia.getDate();

    let html = "";

    // Dias do mês anterior
    const ultimoMesAnterior = new Date(ano, mes, 0).getDate();

    for(let i = primeiroDiaSemana - 1; i >= 0; i--){

        html += `
            <div class="dia-mes fora-mes">
                ${ultimoMesAnterior - i}
            </div>
        `;

    }

    // Dias do mês atual
    for(let dia = 1; dia <= totalDias; dia++){

        html += `
            <div class="dia-mes">
                ${dia}
            </div>
        `;

    }

    // Dias do próximo mês
    const totalCelulas = primeiroDiaSemana + totalDias;
    const restantes = 42 - totalCelulas;

    for(let dia = 1; dia <= restantes; dia++){

        html += `
            <div class="dia-mes fora-mes">
                ${dia}
            </div>
        `;

    }

    return html;

}

function renderizarCalendario(){

    switch(filtrosAgenda.visualizacao){

        case "semanal":
            return calendarioSemanal();

        case "mensal":
            return calendarioMensal();

        default:
            return calendarioDiario();

    }

}

// ======================================================
// BARRA DO CALENDÁRIO
// ======================================================

function barraCalendario(){

    const meses = [
        "Janeiro","Fevereiro","Março",
        "Abril","Maio","Junho",
        "Julho","Agosto","Setembro",
        "Outubro","Novembro","Dezembro"
    ];

    const mes = dataSelecionada.getMonth();

    return `

        <div class="barra-meses">

            <button
                class="mes-anterior"
                onclick="mesAnterior()"
            >

                ${meses[(mes+11)%12]}

            </button>

            <button
                class="mes-atual"
            >

                ${meses[mes]}

            </button>

            <button
                class="mes-proximo"
                onclick="proximoMes()"
            >

                ${meses[(mes+1)%12]}

            </button>

        </div>

    `;

}

function mesAnterior(){

    dataSelecionada = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth() - 1,
        1
    );

    atualizarMiniCalendario();
    atualizarCalendario();

}

function proximoMes(){

    dataSelecionada = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth() + 1,
        1
    );

    atualizarMiniCalendario();
    atualizarCalendario();

}

function atualizarCalendario(){

    abrirCalendario();

}

// ======================================================
// AGENDA DO DIA
// ======================================================

function agendaDoDia(){

    let html="";

    for(let hora=8;hora<=19;hora++){

        html+=`

            <div class="linha-horario">

                <div class="hora">

                    ${hora}:00

                </div>

                <div class="espaco-agenda">

                </div>

            </div>

        `;

    }

    return html;

}

// ======================================================
// BANHO E TOSA
// ======================================================

function abrirBanhoETosa(){

    document.getElementById("botaoFiltro").style.display = "flex";
    document.getElementById("botaoFiltro").onclick = abrirFiltroBanhoETosa;

    abrirTela(
        "Banho e Tosa",
        telaBanhoETosa()
    );

}



// ======================================================
// TELA
// ======================================================
function telaBanhoETosa(){

    return `

        ${barraBanhoETosa()}

        ${
            filtroVisualizacao === "diario"
                ? telaBanhoDiario()
                : telaBanhoMensal()
        }

    `;

}

function telaBanhoDiario(){

    return `

        ${barraSemanaBanho()}

        <div class="titulo-data">

            ${tituloDataSelecionada()}

        </div>

        ${campoBusca("Buscar")}

        <div class="lista-banho-vazia">

            ${caixaVazia("Nenhum registro")}

        </div>

        ${botaoNovo("novoAgendamento")}

    `;

}

function telaBanhoMensal(){

    return `

        <div class="titulo-data mensal">

            ${dataSelecionada.toLocaleDateString("pt-BR",{
                month:"long",
                year:"numeric"
            })}

        </div>

        ${campoBusca("Buscar")}

        <div class="lista-banho-vazia">

            ${caixaVazia("Nenhum registro")}

        </div>

        ${botaoNovo("novoAgendamento")}

    `;

}

function barraSemanaBanho(){

    const dias = ["Dom.","Seg.","Ter.","Qua.","Qui.","Sex.","Sáb."];

    const base = new Date(dataSelecionada);
    const domingo = new Date(base);
    domingo.setDate(base.getDate() - base.getDay());

    let html = `<div class="semana-banho">`;

    for(let i = 0; i < 7; i++){

        const d = new Date(domingo);
        d.setDate(domingo.getDate() + i);

        const ativo =
            d.getDate() === dataSelecionada.getDate() &&
            d.getMonth() === dataSelecionada.getMonth() &&
            d.getFullYear() === dataSelecionada.getFullYear();

        html += `
            <div class="dia-semana-banho ${ativo ? "ativo" : ""}">
                <small>${dias[i]}</small>
                <button onclick="selecionarDataBanho('${d.toISOString()}')">
                    ${d.getDate()}
                </button>
            </div>
        `;
    }

    html += `</div>`;

    return html;

}

function selecionarDataBanho(data){

    dataSelecionada = new Date(data);

    diaSelecionado = dataSelecionada.getDate();

    abrirBanhoETosa();

}



function cardBanho(){

    return `

    <div class="card-banho">

        <div class="faixa-status"></div>

        <img
            src="img/pet.png"
            class="foto-pet"
        >

        <div class="dados-banho">

            <h3>10:00 - Belinha</h3>

            <small>Ranuzia</small>

            <div class="tags">

                <span class="tag dinheiro">
                    $
                </span>

                <span class="tag valor">
                    R$ 59,50
                </span>

            </div>

            <div class="progresso">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class="vazio"></span>
                <span class="vazio"></span>

            </div>

        </div>

        <button class="menu-card">

            <span class="material-symbols-rounded">

                more_vert

            </span>

        </button>

    </div>

    `;

}

function barraBanhoETosa(){

    const meses = [
        "Janeiro","Fevereiro","Março",
        "Abril","Maio","Junho",
        "Julho","Agosto","Setembro",
        "Outubro","Novembro","Dezembro"
    ];

    const mes = dataSelecionada.getMonth();

    return `

        <div class="barra-meses">

            <button
                class="mes-anterior"
                onclick="mesAnteriorBanhoETosa()">

                ${meses[(mes+11)%12]}

            </button>

            <button class="mes-atual">

                ${meses[mes]}

            </button>

            <button
                class="mes-proximo"
                onclick="proximoMesBanhoETosa()">

                ${meses[(mes+1)%12]}

            </button>

        </div>

    `;

}
function mesAnteriorBanhoETosa(){

    dataSelecionada = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth() - 1,
        1
    );

    abrirBanhoETosa();

}

function proximoMesBanhoETosa(){

    dataSelecionada = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth() + 1,
        1
    );

    abrirBanhoETosa();

}

// ======================================================
// LISTA
// ======================================================

function listaAgendamentos(){

    if(agendamentos.length === 0){

        return caixaVazia(

            "Nenhum agendamento cadastrado."

        );

    }

    let html = "";

    agendamentos.forEach((agenda)=>{

        html += `

            <div
                class="cliente"
                onclick="abrirAgendamento('${agenda.id}')"
            >

                <div class="avatar">

                    🐶

                </div>

                <div class="dados-cliente">

                    <h3>

                        ${agenda.pet}

                    </h3>

                    <p>

                        ${agenda.tutor}

                    </p>

                    <small>

                        ${agenda.data} • ${agenda.hora}

                    </small>

                </div>

                <div class="menu-cliente">

                    <span class="material-symbols-rounded">

                        more_vert

                    </span>

                </div>

            </div>

        `;

    });

    return html;

}



// ======================================================
// NOVO AGENDAMENTO
// ======================================================

function novoAgendamento(){

    abrirTela(

        "Novo Agendamento",

        telaNovoAgendamento()

    );

}



function telaNovoAgendamento(){

    return `

    <div class="conteudo-formulario">

        <h2 class="titulo-secao">
            Agendamento
        </h2>

        <div class="campo-autocomplete">

    <label>Tutor</label>

    <input
        id="tutorAgenda"
        type="text"
        placeholder="Digite o nome do tutor..."
        autocomplete="off"
        oninput="pesquisarTutor(this.value)"
    >

    <div
        id="listaTutorAgenda"
        class="lista-autocomplete">
    </div>

</div>

        <div
    class="campo-selecao"
    onclick="abrirSelecaoPet()">

    <label>Pet</label>

    <input
        id="petAgenda"
        type="text"
        placeholder="Selecione um pet"
        readonly
    >

</div>
        
        ${campoSelect(
    "Responsável",
    "responsavelAgenda",
    listaResponsaveis()
)}

        <div
    class="botao-servicos"
    onclick="abrirAdicionarServicos()"
>

            <span class="material-symbols-rounded">
                add_circle
            </span>

            Adicionar Serviço

        </div>

        <div class="caixa">

            ${campoData(
                "Data do serviço",
                "dataAgenda"
            )}

            ${campoData(
                "Vencimento",
                "vencimentoAgenda"
            )}

            ${campoTexto(
                "Hora de início",
                "horaAgenda",
                "09:00"
            )}

            ${campoTexto(
                "Duração",
                "duracaoAgenda",
                "00:30"
            )}

        </div>
        
        <div class="financeiro-agendamento">

    <div class="linha-switch">
        <span>Pet Táxi</span>
        <input
    type="checkbox"
    id="petTaxi"
    onchange="calcularTotalAgendamento()"
>
    </div>

    ${campoTexto(
        "Valor do Táxi",
        "valorTaxi",
        "R$ 0,00",
        "text",
        
        "oninput='calcularTotalAgendamento()'"
    )}

    <div class="linha-switch">
        <span>Repetir</span>
        <input type="checkbox" id="repetirAgenda">
    </div>

    ${campoSelect(
        "Periodicidade",
        "periodicidade",
        [
            "Não repetir",
            "Diariamente",
            "Semanalmente",
            "Quinzenalmente",
            "Mensalmente"
        ]
    )}

    ${campoTexto(
        "Serviços",
        "valorServico",
        "R$ 0,00",
        "text",
        
        "oninput='calcularTotalAgendamento()'"
    )}

    ${campoTexto(
        "Desconto",
        "desconto",
        "0,00",
        "text",
        
        "oninput='calcularTotalAgendamento()'"
    )}

    ${campoTexto(
        "Adicional",
        "adicional",
        "R$ 0,00",
        "text",
        
        "oninput='calcularTotalAgendamento()'"
    )}

    <div class="total-agendamento">

        <span>Total</span>

        <strong id="valorTotal">
            R$ 0,00
        </strong>

    </div>

</div>

<div class="anexo-agendamento">

    <button class="botao-anexo">

        📎 Anexar arquivo

    </button>

</div>
        ${campoTextarea(
            "Observações",
            "observacoesAgenda",
            "Insira informações relevantes..."
        )}

        ${botao(
            "Salvar",
            "salvarAgendamento()"
        )}

    </div>

    `;

}

function abrirAdicionarServicos(){

    abrirBottomSheet(

        telaAdicionarServicos()

    );

}

function telaAdicionarServicos(){

    return `

        <div class="conteudo-servicos">

            <h2 class="titulo-secao">
                Adicionar Serviços
            </h2>

            <div class="caixa-vazia">

                <h3>Em desenvolvimento</h3>

                <p>

                    Aqui serão exibidos os serviços disponíveis.

                </p>

            </div>

            ${botao(
                "Salvar Serviços",
                "fecharBottomSheet()"
            )}

        </div>

    `;

}

function listaResponsaveis(){

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    if(usuarios.length === 0){

        return [
            "Sem responsável"
        ];

    }

    return usuarios.map(usuario => usuario.nome);

}

function selecionarCliente(id){

    const clientes = JSON.parse(
        localStorage.getItem("clientes")
    ) || [];

    const cliente = clientes.find(c => c.id == id);

    if(!cliente){
        return;
    }

    document.getElementById("tutorAgenda").value = cliente.nome;

    document.getElementById("tutorAgenda").dataset.clienteId = cliente.id;

    document.getElementById("listaTutorAgenda").style.display = "none";

    carregarPetsTutor(cliente.id);

}

function abrirNovoClienteComNome(nome){

    localStorage.setItem(
        "novoCliente",
        nome
    );

    abrirNovoCliente();

}

function novoTutor(nome){

    localStorage.setItem(
        "novoTutorNome",
        nome
    );

    abrirTutorNovo();

}

function carregarPetsTutor(idTutor){

    const pets = JSON.parse(
        localStorage.getItem("pets")
    ) || [];

    const lista = pets.filter(
    pet => pet.tutorId == idTutor
);

    preencherSelectPets(lista);

}

function pesquisarTutor(texto){

    const lista = document.getElementById("listaTutorAgenda");

    const clientes = JSON.parse(
        localStorage.getItem("clientes")
    ) || [];

    lista.innerHTML = "";

    if(texto.trim() === ""){

        lista.style.display = "none";
        return;

    }

    const encontrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(
            texto.toLowerCase()
        )
    );

    encontrados.forEach((cliente)=>{

        lista.innerHTML += `

            <div
                class="item-autocomplete"
                onclick="selecionarCliente('${cliente.id}')">

                <strong>${cliente.nome}</strong><br>

                <small>${cliente.celular}</small>

            </div>

        `;

    });

    lista.innerHTML += `

        <div
            class="novo-autocomplete"
            onclick="abrirNovoClienteComNome('${texto}')">

            ➕ Cadastrar "${texto}"

        </div>

    `;

    lista.style.display = "block";

}

function preencherSelectPets(lista){

    const campoPet = document.getElementById("petAgenda");

    if(!campoPet){
        return;
    }

    if(lista.length === 0){

        campoPet.value = "";

        campoPet.placeholder = "Nenhum pet cadastrado";

        return;

    }

    campoPet.value = lista[0].nome;

    campoPet.dataset.petId = lista[0].id;

}

function abrirSelecaoPet(){

    const tutorId = Number(
    document
        .getElementById("tutorAgenda")
        .dataset.clienteId
);

    if(!tutorId){

        alert("Selecione um tutor primeiro.");

        return;

    }

    const pets = JSON.parse(
        localStorage.getItem("pets")
    ) || [];

    const clientes = JSON.parse(
        localStorage.getItem("clientes")
    ) || [];

    const cliente = clientes.find(
    c => c.id === tutorId
);

    if(!cliente){

        alert("Tutor não encontrado.");

        return;

    }

    const lista = pets.filter(
        pet => pet.tutorId === cliente.id
    );

    if(lista.length === 0){

        alert("Esse tutor não possui pets cadastrados.");

        return;

    }

    abrirBottomSheet(
        "Selecionar Pet",
        listaPetsAgenda(lista)
    );

}

function listaPetsAgenda(lista){

    return lista.map(pet => `

        <div
            class="item-lista"
            onclick="selecionarPetAgenda('${pet.id}')">

            <strong>${pet.nome}</strong><br>

            <small>${pet.especie}</small>

        </div>

    `).join("");

}

function selecionarPetAgenda(id){

    const pets = JSON.parse(
        localStorage.getItem("pets")
    ) || [];

    const pet = pets.find(
        p => p.id == id
    );

    if(!pet){
        return;
    }

    document.getElementById("petAgenda").value = pet.nome;

    fecharBottomSheet();

}

// ======================================================
// PACOTES
// ======================================================

function novoPacote(){

    alert("Entrou");

    abrirTela(
        "Novo Pacote",
        telaNovoPacote()
    );

}

function abrirPacotes(){

    document.getElementById("botaoFiltro").style.display = "flex";
    document.getElementById("botaoFiltro").onclick = abrirFiltrosPacotes;

    abrirTela(
        "Pacotes",
        telaPacotes()
    );

}

function telaPacotes(){

    return `

        ${campoBusca("Buscar pacote")}

        <div id="listaPacotes">

            ${listaPacotes()}

        </div>

        ${botaoNovo("novoPacote")}

    `;

}

function telaPacote(pacote){

    return `

        <div class="conteudo-pacote">

            <div class="card-info">

                <h2>Pacote</h2>

                <p>Detalhes em desenvolvimento.</p>

            </div>

            <div class="card-info">

                <h3>Banhos</h3>

                ${caixaVazia("Nenhum banho cadastrado.")}

            </div>

            <div class="card-info">

                <h3>Cliente</h3>

                <p>Em desenvolvimento.</p>

            </div>

            <div class="card-info">

                <h3>Pet</h3>

                <p>Em desenvolvimento.</p>

            </div>

            ${botao("Renovar","")}

        </div>

    `;

}

function listaPacotes(){

    if(pacotes.length === 0){

        return caixaVazia(
            "Nenhum pacote cadastrado."
        );

    }

    return pacotes.map(pacote =>

        cardPacote(pacote)

    ).join("");

}

function abrirPacote(id){

    const pacote = pacotes.find(
        p => p.id == id
    );

    if(!pacote){

        alert("Pacote não encontrado.");

        return;

    }

    abrirTela(
        "Pacote",
        telaPacote(pacote)
    );

}

function novoPacote(){

    abrirTela(

        "Novo Pacote",

        telaNovoPacote()

    );

}

function telaNovoPacote(){

    return `

    <div class="conteudo-formulario">

        <h2 class="titulo-secao">

            Novo Pacote

        </h2>

        <div class="campo-autocomplete">

            <label>Tutor</label>

            <input
                id="tutorPacote"
                type="text"
                placeholder="Digite o nome do tutor..."
                autocomplete="off"
                oninput="pesquisarTutorPacote(this.value)"
            >

            <div
                id="listaTutorPacote"
                class="lista-autocomplete">
            </div>

        </div>

        <div
            class="campo-selecao"
            onclick="abrirSelecaoPetPacote()">

            <label>Pet</label>

            <input
                id="petPacote"
                type="text"
                placeholder="Selecione um pet"
                readonly
            >

        </div>

        ${campoSelect(
            "Responsável",
            "responsavelPacote",
            listaResponsaveis()
        )}

        <div
            class="botao-servicos"
            onclick="abrirAdicionarServicosPacote()">

            <span class="material-symbols-rounded">
                add_circle
            </span>

            Adicionar Serviço

        </div>

        ${campoData(
            "Data do primeiro banho",
            "dataPacote"
        )}

        ${campoTexto(
            "Hora",
            "horaPacote",
            "09:00"
        )}

        ${campoTexto(
            "Duração",
            "duracaoPacote",
            "00:30"
        )}

        ${campoTexto(
            "Número de sessões",
            "totalSessoes",
            "4"
        )}

        ${campoSelect(
            "Intervalo",
            "intervaloPacote",
            [
                "Semanal",
                "Quinzenal",
                "Mensal"
            ]
        )}

        ${botao(
            "Salvar",
            "salvarPacote()"
        )}

    </div>

    `;

}

function salvarPacote(){

    const pacote = {

        id: Date.now(),

        tutor: document.getElementById("tutorPacote").value,

        pet: document.getElementById("petPacote").value,

        responsavel: document.getElementById("responsavelPacote").value,

        data: document.getElementById("dataPacote").value,

        hora: document.getElementById("horaPacote").value,

        duracao: document.getElementById("duracaoPacote").value,

        totalSessoes: Number(
            document.getElementById("totalSessoes").value
        ),

        sessoesUsadas: 0,

        intervalo: document.getElementById("intervaloPacote").value,

        status: "Ativo",

        criadoEm: new Date().toISOString()

    };

    pacotes.push(pacote);

    localStorage.setItem(
        "pacotes",
        JSON.stringify(pacotes)
    );

    alert("Pacote salvo com sucesso!");

    abrirPacotes();

}

function abrirFiltrosPacotes(){

    abrirBottomSheet(`
        <h2>Filtros</h2>
        Em desenvolvimento.
    `);

}

function cardPacote(pacote){

    return `

        <div
            class="card-pacote"
            onclick="abrirPacote(${pacote.id})">

            <h3>${pacote.pet}</h3>

            <small>${pacote.tutor}</small>

            <p>

                ${pacote.intervalo}

                •

                ${pacote.sessoesUsadas}/${pacote.totalSessoes}

            </p>

        </div>

    `;

}

// ======================================================
// CHECKLIST
// ======================================================

function abrirChecklist(){

    abrirTela(

        "Serviços (Checklist)",

        telaChecklist()

    );

}

function telaChecklist(){

    return `

        ${campoBusca("Buscar checklist")}

        <div class="checklist-servico">

            <label><input type="checkbox"> Recepção</label>

            <label><input type="checkbox"> Avaliação do animal</label>

            <label><input type="checkbox"> Corte de unhas</label>

            <label><input type="checkbox"> Limpeza dos ouvidos</label>

            <label><input type="checkbox"> Banho</label>

            <label><input type="checkbox"> Secagem</label>

            <label><input type="checkbox"> Escovação</label>

            <label><input type="checkbox"> Perfume</label>

            <label><input type="checkbox"> Foto Final</label>

            <label><input type="checkbox"> Entrega ao tutor</label>

        </div>

    `;

}



// ======================================================
// SALVAR AGENDAMENTO
// ======================================================

function calcularTotalAgendamento(){

    const servicos =
        parseFloat(
            document.getElementById("valorServico").value
            .replace("R$","")
            .replace(",",".")
        ) || 0;

    const taxi =
        parseFloat(
            document.getElementById("valorTaxi").value
            .replace("R$","")
            .replace(",",".")
        ) || 0;

    const desconto =
        parseFloat(
            document.getElementById("desconto").value
            .replace(",",".")
        ) || 0;

    const adicional =
        parseFloat(
            document.getElementById("adicional").value
            .replace("R$","")
            .replace(",",".")
        ) || 0;

    let total = servicos + adicional - desconto;

    if(document.getElementById("petTaxi").checked){

        total += taxi;

    }

    document.getElementById("valorTotal").innerText =
        "R$ " + total.toFixed(2).replace(".",",");

}

function salvarAgendamento(){

    const agendamento={

        id:Date.now(),

        tutor:document.getElementById("tutorAgenda").value,

        pet:document.getElementById("petAgenda").value,

        data:document.getElementById("dataAgenda").value,

        hora:document.getElementById("horaAgenda").value,
        
        responsavel:document.getElementById("responsavelAgenda").value,

        servico: document.getElementById("valorServico").value,

        observacoes:document
            .getElementById("observacoesAgenda")
            .value,

        status:"Agendado",

        criadoEm:new Date().toISOString()

    };

    agendamentos.push(agendamento);

    localStorage.setItem(

        "agendamentos",

        JSON.stringify(agendamentos)

    );

    alert("Agendamento salvo com sucesso!");

    abrirBanhoETosa();

}



// ======================================================
// FICHA DO AGENDAMENTO
// ======================================================

function abrirAgendamento(id){

    const agenda = agendamentos.find(a => a.id == id);

    if(!agenda){

        alert("Agendamento não encontrado.");

        return;

    }

    alert(

`Tutor: ${agenda.tutor}

Pet: ${agenda.pet}

Serviço: ${agenda.servico}

Data: ${agenda.data}

Horário: ${agenda.hora}

Status: ${agenda.status}

Observações:
${agenda.observacoes}`

    );

}