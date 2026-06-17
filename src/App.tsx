
import { useEffect, useState } from 'react';

interface Personagem {
  id:number;
  nome:string;
  classe:string;
  nivel:number;
}

export default function App(){
  const [lista,setLista]=useState<Personagem[]>([]);
  const [nome,setNome]=useState('');
  const [classe,setClasse]=useState('');
  const [nivel,setNivel]=useState(1);
  const [editando,setEditando]=useState<number|null>(null);

  useEffect(()=>{
    const dados=localStorage.getItem('personagens');
    if(dados) setLista(JSON.parse(dados));
  },[]);

  useEffect(()=>{
    localStorage.setItem('personagens',JSON.stringify(lista));
  },[lista]);

  function salvar(){
    if(editando){
      setLista(lista.map(p=>p.id===editando?{id:editando,nome,classe,nivel}:p));
      setEditando(null);
    }else{
      setLista([...lista,{id:Date.now(),nome,classe,nivel}]);
    }
    setNome(''); setClasse(''); setNivel(1);
  }

  return (
    <div style={{padding:'20px',fontFamily:'Arial'}}>
      <h1>Inventário RPG CRUD</h1>
      <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)}/>
      <input placeholder="Classe" value={classe} onChange={e=>setClasse(e.target.value)}/>
      <input type="number" value={nivel} onChange={e=>setNivel(Number(e.target.value))}/>
      <button onClick={salvar}>{editando?'Atualizar':'Cadastrar'}</button>

      <table border={1} cellPadding={5} style={{marginTop:'20px'}}>
        <thead><tr><th>ID</th><th>Nome</th><th>Classe</th><th>Nível</th><th>Ações</th></tr></thead>
        <tbody>
          {lista.map(p=>(
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.classe}</td>
              <td>{p.nivel}</td>
              <td>
                <button onClick={()=>{setNome(p.nome);setClasse(p.classe);setNivel(p.nivel);setEditando(p.id)}}>Editar</button>
                <button onClick={()=>setLista(lista.filter(x=>x.id!==p.id))}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
