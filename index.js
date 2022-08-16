const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const conexao = mysql.createConnection({
    host: '172.17.0.1',
    post: '6520',
    password: '123@senac',
    database: 'bancoloja'
});

conexao.connect((erro)=>{
    if(erro){
       return console.error(`Não conectou -> ${erro}`);
    }
     return console.log(`Banco de dados online -> ${conexao.threadId}`);
});

app.get("/usuarios/listar",(req, res)=>{
    conexao.query("select * from usuarios",(erro,dados)=>{
        if(erro)return res.status(500).send({output:`Erro -> ${erro}`});
        res.status(200).send({output:dados});
    });
});

app.post("/usuarios/cadastro",(req, res)=>{
    if(req.bodynomeusuario == "" || 
    req.body.senha == "" || 
    req.body.email == "" || 
    req.body.nomecompleto == "" || 
    req.body.cpf == "" || 
    req.body.foto == ""
    ){
        return res.status(400).send({output:`Preencha todos os campos`});
    }
    conexao.query("insert into usuario set ?",req,body,(erro,dados)=>{
        if(erro)return res.status(500).send({output:`Erro ao tentar cadastrar-> ${error}`});
        res.status(201).send({output:`Usuário cadastrado`,dados:data});
    });
});

app.post("/usuarios/login",(req,res)=>{
    if(req.body.nomeusuario == "" ||
    req.body.senha == ""){
    req.body.status(400).
    send({output:`Você deve preencher todos os campos`});
    }
    conexao.query("select * from usuarios where nomeusuario=? and senha=?", [req.body.nomeusuario,req.body.senha],(error, data)=>{
        if(error) return res.status(500).send({output:`Erro ao tentar logar -> ${error}`})
        res.status(200).send({output:`Logado`, dados:data})
    })
});

app.put("/usuarios/atualizar/:id", (req, res)=>{
    conexao.query("update usuario set ? where id=?", [req.body,req.params.id],(error, data)=>{
        if(error) return res.status(500).send({output:`Erro ao tentar atualizar -> ${error}`})
    })
    res.status(200).send({output:`Atualizado`, dados:data});
})

app.listen("3000", () => console.log("Servidor online"));