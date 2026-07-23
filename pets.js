// ======================================================
// ANIMALLOVER
// PETS.JS
// ------------------------------------------------------
// Cadastro e gerenciamento de pets
// ======================================================



// ======================================================
// BANCO DE DADOS
// ======================================================

let pets = JSON.parse(localStorage.getItem("pets")) || [];



// ======================================================
// TELA PRINCIPAL
// ======================================================

function abrirPets(){

    abrirTela(

        "Pets",

        telaPets()

    );

}

function telaPets(){

    return `

        ${buscarPets()}

        ${filtroPets()}

        ${listaPets()}

        ${botaoNovoPet()}

    `;

}



// ======================================================
// BUSCA E FILTRO
// ======================================================

function buscarPets(){

    return campoBusca("Buscar pet");

}

function filtroPets(){

    return `

        <div class="filtro-clientes">

            <label>

                <input
                    type="radio"
                    name="statusPets"
                    checked
                >

                Ativos

            </label>

            <label>

                <input
                    type="radio"
                    name="statusPets"
                >

                Inativos

            </label>

        </div>

    `;

}



// ======================================================
// LISTA DE PETS
// ======================================================

function listaPets(){

    if(pets.length === 0){

        return caixaVazia("Nenhum pet cadastrado.");

    }

    let html = "";

    pets.forEach(function(pet, indice){

        const tutor = pet.tutorNome || pet.tutor || "Tutor não informado";

        const especie = pet.especie || "";
        const raca = pet.raca || "";
        const porte = pet.porte || "";
        const detalhe = [especie, raca, porte].filter(Boolean).join(" • ");

        const icone = especie === "Gato" ? "🐱" : "🐶";

        html += `

            <div
                class="cliente"
                onclick="abrirFichaPet(${indice})"
            >

                <div class="avatar">

                    ${icone}

                </div>

                <div class="dados-cliente">

                    <h3>${pet.nome || "Sem nome"}</h3>

                    <p>${tutor}</p>

                    ${detalhe ? `<small>${detalhe}</small>` : ""}

                </div>

                <div
                    class="menu-cliente"
                    onclick="event.stopPropagation()"
                >

                    ⋮

                </div>

            </div>

        `;

    });

    return html;

}

function botaoNovoPet(){

    return botaoNovo("selecionarTutor");

}



// ======================================================
// SELECIONAR TUTOR
// ======================================================

function selecionarTutor(){

    abrirTela(

        "Pets > Selecione o Tutor",

        telaSelecionarTutor()

    );

}

function telaSelecionarTutor(){

    let html = `

        ${campoBusca("Ex: nome, pet, celular")}

    `;

    if(clientes.length === 0){

        html += caixaVazia("Nenhum cliente cadastrado.");

        return html;

    }

    clientes.forEach(function(cliente, indice){

        html += cardSelecionarTutor(

            indice,

            cliente.nome

        );

    });

    return html;

}



// ======================================================
// NOVO PET
// ======================================================

function abrirNovoPet(idTutor){

    abrirTela(

        "Novo Pet",

        telaNovoPet(idTutor)

    );

}

function telaNovoPet(idTutor){

    const tutor = clientes[idTutor];

    if(!tutor){

        return caixaVazia("Tutor não encontrado.");

    }

    return `

        ${cardTutorPet(tutor)}

        <div class="conteudo-formulario">

            ${separador()}

            ${campoImagem()}

            ${campoTexto(
                "Nome do Pet",
                "nomePet",
                "Digite o nome do pet"
            )}

            ${campoData(
                "Data de Nascimento",
                "dataNascimento"
            )}

            ${campoSelect(
                "Gênero",
                "generoPet",
                ["Macho", "Fêmea"]
            )}

            ${campoSelect(
                "Espécie",
                "especiePet",
                ["Cão", "Gato"]
            )}

            ${campoTexto(
                "Raça",
                "racaPet",
                "Ex: Shih-tzu"
            )}

            ${campoSelect(
                "Porte",
                "portePet",
                ["Mini", "Pequeno", "Médio", "Grande", "Gigante"]
            )}

            ${campoSelect(
                "Comportamento",
                "comportamentoPet",
                ["Dócil", "Agitado", "Agressivo"]
            )}

            ${campoTextarea(
                "Notas Internas",
                "notasPet",
                "Digite observações"
            )}

            ${campoTextarea(
                "Restrições",
                "restricoesPet",
                "Digite restrições ou recomendações"
            )}

        </div>

        ${rodapeNovoPet(idTutor)}

    `;

}



// ======================================================
// SALVAR PET
// ======================================================

async function salvarPet(idTutor){

    const tutor = clientes[idTutor];

    if(!tutor){

        alert("Tutor não encontrado.");

        return;

    }

    const nome = document.getElementById("nomePet").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const genero = document.getElementById("generoPet").value;
    const especie = document.getElementById("especiePet").value;
    const raca = document.getElementById("racaPet").value.trim();
    const porte = document.getElementById("portePet").value;
    const comportamento = document.getElementById("comportamentoPet").value;
    const notas = document.getElementById("notasPet").value.trim();
    const restricoes = document.getElementById("restricoesPet").value.trim();

    const fotoInput = document.getElementById("fotoPet");
    const arquivoFoto = fotoInput && fotoInput.files ? fotoInput.files[0] : null;

    if(nome === ""){

        alert("Informe o nome do pet.");

        return;

    }

    let foto = "";

    if(arquivoFoto){

        try{

            foto = await arquivoParaBase64(arquivoFoto);

        }

        catch{

            alert("Não foi possível carregar a foto.");

            return;

        }

    }

    const pet = {

        id: Date.now(),
        tutorId: idTutor,
        tutorNome: tutor.nome,
        nome,
        dataNascimento,
        genero,
        especie,
        raca,
        porte,
        comportamento,
        notas,
        restricoes,
        foto,
        status: "Ativo"

    };

    pets.push(pet);

    localStorage.setItem(
        "pets",
        JSON.stringify(pets)
    );
   alert("Pet cadastrado com sucesso!"); 
    abrirPets();

}

function salvarEAgendar(idTutor){

    salvarPet(idTutor);

}



// ======================================================
// FICHA DO PET
// ======================================================

function abrirFichaPet(id){

    const pet = pets[id];

    if(!pet){

        alert("Pet não encontrado.");

        return;

    }

    alert("Abrindo ficha de " + pet.nome);

}



// ======================================================
// UTILITÁRIOS
// ======================================================

function arquivoParaBase64(arquivo){

    return new Promise(function(resolve, reject){

        const leitor = new FileReader();

        leitor.onload = function(){

            resolve(leitor.result);

        };

        leitor.onerror = function(){

            reject(new Error("Falha ao ler o arquivo."));

        };

        leitor.readAsDataURL(arquivo);

    });

}

function limparPets(){

    if(!confirm("Deseja realmente apagar todos os pets?")){

        return;

    }

    localStorage.removeItem("pets");

    pets = [];

    abrirPets();

}