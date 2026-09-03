// ======================================================
// DESENVOLVEDOR
// ======================================================

function limparClientes(){

    if(confirm("Deseja apagar todos os clientes e pets?")){

        localStorage.removeItem("clientes");
        localStorage.removeItem("pets");
        localStorage.removeItem("agendamentos");

        clientes = [];

        abrirClientes();

    }

}

function limparPets(){

    // Futuramente
}

function limparAgenda(){

    // Futuramente
}

function exportarBackup(){

    // Futuramente
}

function importarBackup(){

    // Futuramente
}