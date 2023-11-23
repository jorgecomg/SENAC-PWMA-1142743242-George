var login = true

if (localStorage.getItem("banco") === null) {
    localStorage.setItem("banco", JSON.stringify([
        {
            "id": 0,
            "nome": "admin",
            "email": "admin",
            "senha": "admin"
        }
    ]));
}

function switchlogin() {
    login = !login
    updateinfo()
}

function updateinfo() {
    if (login) {
    document.getElementById('logincad').innerHTML  = `
    <p>Não possui uma conta?
    <button type = "button" onclick = "switchlogin()" id = "cadastroswitch">
    Clique aqui para se cadastrar</button><p>
    <h1>
    <p>Login</p>
    </h1><br>
    <p>E-mail:</p>
    <input type="text" id = "email" placeholder = "E-mail"><br>
    <p>Senha:</p>
    <div id="camposenha">
    <input type="password" id="senha" placeholder = "Senha">
    <button type="button" onmousedown = "switchsenha()" onmouseup = "switchsenha1()">
    <img src = "eye-close.png">
    </button>
    </div>
    <p><button type="button" onclick = "entrarcad()">Entrar</button></p>
    
    `
    } else {
    document.getElementById('logincad').innerHTML  = `
    <p>Já possui uma conta?
    <button type = "button" onclick = "switchlogin()" id = "cadastroswitch">
    Clique aqui para fazer login</button><p>
    <h1>
    <p>Cadastro</p>
    </h1><br>
    <p>Nome:</p>
    <input type="text" id = "nome" placeholder = "Nome"><br>
    <p>E-mail:</p>
    <input type="text" id = "email" placeholder = "E-mail"><br>
    <p>Senha:</p>
    <div id="camposenha">
    <input type="password" id="senha" placeholder = "Senha">
    <button type="button" onmousedown = "switchsenha()" onmouseup = "switchsenha1()">
    <img src = "eye-close.png">
    </button>
    </div>
    <p>Confirme a senha:</p>
    <input type="password" id = "senha1" placeholder = "Confirme a senha"><br><br>
    <p><button type="button" onclick = "entrarcad()">Cadastrar</button></p>
    
    `
    }
}

function entrarcad() {
    let bancoString = localStorage.getItem("banco");
    let array = JSON.parse(bancoString) || [];

    if (login) {
        email = document.getElementById('email').value;
        item = array.findIndex(x => x.email === email);
        if(document.getElementById('email').value != "" && document.getElementById('senha').value != "") {
            if (item != -1 && array[item].senha === document.getElementById('senha').value) {
            window.alert("Login feito com sucesso");
            window.location.href = "index.html";
            sessionStorage.setItem("usuario", email);
            } else {
                window.alert("E-mail ou senha errados")
            }
            
        } else {
            window.alert("Erro com o login")
        }
    } else {
        nome = document.getElementById('email').value;
        if(document.getElementById('nome').value != "" && document.getElementById('email').value != "" && document.getElementById('senha').value != "" && document.getElementById('senha').value == document.getElementById('senha1').value) {
            
            sessionStorage.setItem("usuario", nome);  
            array.push({
                "id": array.length,
                "nome": document.getElementById('nome').value,
                "email": document.getElementById('email').value,
                "senha": document.getElementById('senha').value
            });

            bancoString = JSON.stringify(array);
            localStorage.setItem("banco", bancoString);

            window.alert("Cadastro feito com sucesso");
            window.location.href = "index.html";
            
        } else {
            window.alert("Erro com o cadastro")
        }
    }
}

function switchsenha() {

    passwordvalue = document.getElementById('senha').value
    
    document.getElementById('camposenha').innerHTML  = `
    <input type="text" id="senha" placeholder = "Senha">
    <button type="button" onmousedown = "switchsenha()" onmouseup = "switchsenha1()">
    <img src = "eye-open.png">
    </button>
    `
    document.getElementById('senha').value = passwordvalue
    
}

function switchsenha1() {

    passwordvalue = document.getElementById('senha').value
    
    
        document.getElementById('camposenha').innerHTML  = `
        <input type="password" id="senha" placeholder = "Senha">
        <button type="button" onmousedown = "switchsenha()" onmouseup = "switchsenha1()">
        <img src = "eye-close.png">
        </button>
        `
        document.getElementById('senha').value = passwordvalue
    
}

function updateuser() {
    usueruser = sessionStorage.getItem("usuario")
    if (usueruser == null) {
        document.getElementById("user").innerHTML = "<p><h2>Sem usuário</h2></p>";
    } else {
    document.getElementById("user").innerHTML = "<p><h2>"+usueruser+"</h2></p>";
    }

    if(usueruser === "admin") {
        document.getElementById("listanav").innerHTML += `
        <div id = "container">
        <li><a href="usuarios.html">Usuários</a></li>
        </div>
        `
    }
}

function tabelaupdate(attuser) {
    if (attuser === 1) {
    updateuser();
    }
    bancoString = localStorage.getItem("banco");
    array = JSON.parse(bancoString);

    array.forEach((valor, indice) => {
        if (valor.id == 0) {
            document.getElementById('tabelaDiv').innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id = "tabela">
                    <tr>
                        <td>${valor.id}</td>
                        <td>${valor.nome}</td>
                        <td>${valor.email}</td>
                        <td>${valor.senha}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            `
        } else {
            document.getElementById('tabela').innerHTML += `
            <tr>
                        <td>${valor.id}</td>
                        <td>${valor.nome}</td>
                        <td>${valor.email}</td>
                        <td>${valor.senha}</td>
                        <td><button type="button" onclick = "deleteitem(${valor.id})"><img src = "delete.png" id = "imagemdelete"></button><button type= "button" onclick = "alteritem(${valor.id})"><img src = "alter.png" id = "imagemdelete"></button></td>
                    </tr>
            `
        }
    });
}

function deleteitem(index) {
    let bancoString = localStorage.getItem("banco");
    let array = JSON.parse(bancoString) || [];
    item = array.findIndex(x => x.id === index);
    array.splice(item, 1);
    bancoString = JSON.stringify(array);
    localStorage.setItem("banco", bancoString);
    tabelaupdate(0);
}

function alteritem(index) {
    let bancoString = localStorage.getItem("banco");
    let array = JSON.parse(bancoString) || [];
    item = array.findIndex(x => x.id === index);

    novoNome = prompt(`Editar nome de ${array[item].nome}:`, array[item].nome);
    novoEmail = prompt(`Editar email de ${array[item].email}:`, array[item].email);
    novaSenha = prompt(`Editar senha de ${array[item].senha}:`, array[item].senha);

    array[item] = {
        "id": array[item].id,
        "nome": novoNome,
        "email": novoEmail,
        "senha": novaSenha
    }
    bancoString = JSON.stringify(array);
    localStorage.setItem("banco", bancoString);
    tabelaupdate(0);
}


