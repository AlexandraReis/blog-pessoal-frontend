import React , {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid,  Typography, Button, TextField } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

function CadastroUsuario() {
  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  const [user, setUser] = useState<User>({
 
  id: 0,
  nome: '',
  usuario: '',
  senha: '',
  foto: '',
});
 
  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });
  useEffect(() => {
    if (userResult.id !== 0) {
      navigate('/login');
    }
  }, [userResult]);
  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
}

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

  
    if (confirmarSenha === user.senha && user.senha.length >= 3) {
     
      try {
        await cadastroUsuario('/usuarios/cadastrar', user, setUserResult);
        alert('Usuário cadastrado com sucesso'); 
      } catch (error) {
        alert('Falha interna ao cadastrar'); 
      }
    } else {
     
      alert('As senhas não conferem. Favor verificar novamente');

      setUser({ ...user, senha: '' }); 
      setConfirmarSenha(''); 
    }
  }

 
 
    
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={6} className='imagem2'></Grid>
        <Grid item xs={6} alignItems="center">
        <Box paddingX={10}>
        <form onSubmit={onSubmit} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="textos2">Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(event: ChangeEvent<HTMLInputElement>) =>updateModel(event) } id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth />
                        <TextField value={user.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) =>updateModel(event) } id="usuario" label="usuario" variant="outlined" name="usuario" margin="normal" fullWidth />
                        <TextField value={user.senha} onChange={(event: ChangeEvent<HTMLInputElement>) =>updateModel(event) } id="senha" label="senha" variant="outlined" name="senha" margin="normal" type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e:ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign="center">
                            <Link to= "/login"  className='text-decorator-none'>
                            <Button  variant="contained" color="secondary" className='btnCancelar'>
                                Cancelar
                            </Button>
                            </Link>
                            <Button type="submit"  variant="contained" color="primary">
                                Cadastrar
                            </Button>
                        </Box>
                    </form> 
        
        
        </Box>
</Grid>

    </Grid>
  )

  }
  export default CadastroUsuario
