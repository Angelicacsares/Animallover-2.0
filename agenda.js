// ======================================================
// ANIMALLOVER
// AGENDA.JS
// ------------------------------------------------------
// Gerenciamento da agenda do sistema
// ======================================================



// ======================================================
// MENU AGENDA
// ======================================================

function abrirAgenda(){

    mostrarPainel("Agenda",[

        {
            icone:"📅",
            nome:"Calendário",
            funcao:"abrirCalendario"
        },

        {
            icone:"✂️",
            nome:"Banho e Tosa",
            funcao:"abrirBanhoETosa"
        },

        {
            icone:"📦",
            nome:"Pacotes",
            funcao:"abrirPacotes"
        },

        {
            icone:"✅",
            nome:"Serviços (Checklist)",
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

        ${campoBusca("Buscar agendamento")}

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

function telaBanhoETosa(){

    return `

        ${campoBusca("Buscar banho e tosa")}

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

        ${campoBusca("Buscar serviço")}

    `;

}