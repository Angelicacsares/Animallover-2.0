// ======================================================
// ANIMALLOVER
// PETS.JS
// ======================================================



// ======================================================
// BANCO DE DADOS
// ======================================================

let pets = JSON.parse(
    localStorage.getItem("pets")
) || [];



// ======================================================
// TELA PRINCIPAL
// ======================================================

function abrirPets(){

    atualizarMenuAtivo("abrirPets");

    abrirTela(

        "Pets",

        telaPets()

    );

}



function telaPets(){

    return `

        ${campoBusca("Buscar pet")}

        ${filtroPets()}

        ${listaPets()}

        ${botaoNovo("selecionarTutor")}

    `;

}



// ======================================================
// FILTRO
// ======================================================

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
// LISTA
// ======================================================

function listaPets(){

    if(pets.length === 0){

        return caixaVazia(

            "Nenhum pet cadastrado."

        );

    }

    let html = "";

    pets.forEach((pet, indice)=>{

        const tutor = pet.tutorNome || "Tutor não informado";

        const detalhes = [

            pet.especie,

            pet.raca,

            pet.porte

        ].filter(Boolean).join(" • ");

        const icone =

            pet.especie === "Gato"

                ? "🐱"

                : "🐶";

        html += `

            <div
                class="cliente"
                onclick="abrirFichaPet(${indice})"
            >

                <div class="avatar">

                    ${icone}

                </div>

                <div class="dados-cliente">

                    <h3>

                        ${pet.nome}

                    </h3>

                    <p>

                        ${tutor}

                    </p>

                    ${
                        detalhes
                        ? `<small>${detalhes}</small>`
                        : ""
                    }

                </div>

                <div
                    class="menu-cliente"
                    onclick="event.stopPropagation()"
                >

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
// SELECIONAR TUTOR
// ======================================================

function selecionarTutor(){

    abrirTela(

        "Selecione o Tutor",

        telaSelecionarTutor()

    );

}

function telaSelecionarTutor(){

    let html = `

        ${campoBusca("Buscar tutor")}

    `;

    if(clientes.length === 0){

        html += caixaVazia(
            "Nenhum cliente cadastrado."
        );

        return html;

    }

    clientes.forEach((cliente, indice)=>{

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

        return caixaVazia(
            "Tutor não encontrado."
        );

    }

    return `

        ${cardTutorPet(tutor)}

        <div class="conteudo-formulario">

            ${campoImagem()}

            ${tituloSecao("Dados do Pet")}

            ${campoTexto(
                "Nome",
                "nomePet",
                "Digite o nome do pet"
            )}

            ${campoData(
                "Data de nascimento",
                "dataNascimento"
            )}

            ${campoSelect(
                "Espécie",
                "especiePet",
                ["Cão","Gato"]
            )}

            ${campoTexto(
                "Raça",
                "racaPet",
                "Ex.: Shih-tzu"
            )}

            ${campoSelect(
                "Sexo",
                "generoPet",
                ["Macho","Fêmea"]
            )}

            ${campoSelect(
                "Porte",
                "portePet",
                [
                    "Mini",
                    "Pequeno",
                    "Médio",
                    "Grande",
                    "Gigante"
                ]
            )}

            ${campoSelect(
                "Comportamento",
                "comportamentoPet",
                [
                    "Dócil",
                    "Agitado",
                    "Agressivo"
                ]
            )}

            ${campoTextarea(
                "Observações",
                "notasPet",
                "Digite observações internas"
            )}

            ${campoTextarea(
                "Restrições",
                "restricoesPet",
                "Alergias, medicamentos, recomendações..."
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
    const especie = document.getElementById("especiePet").value;
    const genero = document.getElementById("generoPet").value;
    const raca = document.getElementById("racaPet").value.trim();
    const porte = document.getElementById("portePet").value;
    const comportamento = document.getElementById("comportamentoPet").value;
    const notas = document.getElementById("notasPet").value.trim();
    const restricoes = document.getElementById("restricoesPet").value.trim();

    if(nome === ""){

        alert("Informe o nome do pet.");
        return;

    }

    let foto = "";

    const fotoInput = document.getElementById("fotoPet");

    if(fotoInput && fotoInput.files.length > 0){

        try{

            foto = await arquivoParaBase64(
                fotoInput.files[0]
            );

        }catch{

            alert("Erro ao carregar a foto.");
            return;

        }

    }

    const pet = {

        id:Date.now(),

        tutorId:idTutor,

        tutorNome:tutor.nome,

        nome,

        dataNascimento,

        especie,

        genero,

        raca,

        porte,

        comportamento,

        notas,

        restricoes,

        foto,

        status:"Ativo",

        criadoEm:new Date().toISOString()

    };

    pets.push(pet);

    if(!tutor.pets){

        tutor.pets = [];

    }

    tutor.pets.push(pet.id);

    localStorage.setItem(
        "pets",
        JSON.stringify(pets)
    );

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    alert("Pet cadastrado com sucesso!");

    abrirPets();

}



// ======================================================
// SALVAR E AGENDAR
// ======================================================

async function salvarEAgendar(idTutor){

    await salvarPet(idTutor);

    // Futuramente:
    // abrirNovoAgendamento();

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

    alert(

`Nome: ${pet.nome}

Tutor: ${pet.tutorNome}

Espécie: ${pet.especie}

Raça: ${pet.raca}

Porte: ${pet.porte}`

    );

}



// ======================================================
// UTILITÁRIOS
// ======================================================

function arquivoParaBase64(arquivo){

    return new Promise((resolve,reject)=>{

        const leitor = new FileReader();

        leitor.onload = ()=>{

            resolve(leitor.result);

        };

        leitor.onerror = ()=>{

            reject();

        };

        leitor.readAsDataURL(arquivo);

    });

}



// ======================================================
// LIMPAR PETS
// ======================================================

function limparPets(){

    if(

        !confirm(

            "Deseja apagar todos os pets?"

        )

    ){

        return;

    }

    localStorage.removeItem("pets");

    pets = [];

    clientes.forEach(cliente=>{

        cliente.pets = [];

    });

    localStorage.setItem(

        "clientes",

        JSON.stringify(clientes)

    );

    abrirPets();

}