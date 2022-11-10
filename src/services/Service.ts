import { Https } from "@mui/icons-material";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://blogdothiagofaccipieri.onrender.com/"
});

export const cadastroUsuario = async (url:any, dados: any, setDados:any) =>{
  const resposta = await api.post(url,dados);
  setDados(resposta.data);
};


export const login = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data.token);
  };
 
