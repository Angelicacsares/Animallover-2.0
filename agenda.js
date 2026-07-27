// ======================================================
// ANIMALLOVER
// AGENDA.JS
// ======================================================


// ======================================================
// BANCO DE DADOS
// ======================================================

let agendamentos = JSON.parse(
    localStorage.getItem("agendamentos")
) || [];



// ======================================================
// MENU AGENDA
// ======================================================

function abrirAgenda(){

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

    atualizarMenuAtivo("abrirAgenda");

    abrirTela(

        "Calendário",

        telaCalendario()

    );

}



function telaCalendario(){

    return `

        ${campoBusca("Buscar agendamento")}

        ${botaoNovo("novoAgendamento")}

    `;

}

// ======================================================
// BANHO E TOSA
// ======================================================

function abrirBanhoETosa(){

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

        ${campoBusca("Buscar agendamento")}

        ${listaAgendamentos()}

        ${botaoNovo("novoAgendamento")}

    `;

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

    agendamentos.forEach((agenda, indice)=>{

        html += `

            <div
                class="cliente"
                onclick="abrirAgendamento(${indice})"
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

            ${tituloSecao("Agendamento")}

            ${campoTexto(
                "Tutor",
                "tutorAgenda",
                "Selecione o tutor"
            )}

            ${campoTexto(
                "Pet",
                "petAgenda",
                "Selecione o pet"
            )}

            ${campoData(
                "Data",
                "dataAgenda"
            )}

            ${campoTexto(
                "Horário",
                "horaAgenda",
                "09:00"
            )}

            ${campoSelect(
                "Serviço",
                "servicoAgenda",
                [
                    "Banho",
                    "Tosa",
                    "Banho + Tosa",
                    "Hidratação",
                    "Transporte"
                ]
            )}

            ${campoTextarea(
                "Observações",
                "observacoesAgenda",
                "Informações importantes"
            )}

            ${botao(

                "Salvar Agendamento",

                "salvarAgendamento()"

            )}

        </div>

    `;

}

// ======================================================
// PACOTES
// ======================================================

function abrirPacotes(){

    abrirTela(

        "Pacotes",

        telaPacotes()

    );

}

function telaPacotes(){

    return `

        ${campoBusca("Buscar pacote")}

        ${caixaVazia(
            "Nenhum pacote cadastrado."
        )}

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

function salvarAgendamento(){

    const agendamento={

        id:Date.now(),

        tutor:document.getElementById("tutorAgenda").value,

        pet:document.getElementById("petAgenda").value,

        data:document.getElementById("dataAgenda").value,

        hora:document.getElementById("horaAgenda").value,

        servico:document.getElementById("servicoAgenda").value,

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

function abrirAgendamento(indice){

    const agenda=agendamentos[indice];

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