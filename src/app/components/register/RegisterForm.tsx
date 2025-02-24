'use client'
import Input from "@/app/components/register/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@/app/components/generics/Button";
import { redirect } from "next/navigation";


export default function RegisterForm() {

    const [values, setValues] = useState({username: "", email: "", password: "", password_confirm: ""});
    const [error, setError] = useState({username: "", email: "", password: "", password_confirm: "", message: ""});

    function handleChange (event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setValues((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        }) 
    }
    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    });

        const data = await response.json();
       
        if(!response.ok){
            console.log(error);
            setError({
                username: data.username,
                email: data.email,
                password: data.password,
                password_confirm: data.password_confirm,
                message: data.message
            });
            return data;
        }
        redirect("/");
    }

    

    return (
        <form action="/api/register" method="POST" className="flex flex-col gap-4" autoComplete="random-string" onSubmit={handleSubmit}>
            <Input 
                label="Seu nome de usuário" 
                name="username" 
                id="username" 
                type="text" 
                autoComplete="off"
                onChange={handleChange} 
                value={values.username}
                title="Digite seu nome de usuário"
                placeholder="ex: Joao Da Silva"
            />
            {error.username != undefined && <p className="text-sm text-red-500">{error.username}</p>}

            <Input 
                label="Seu Email" 
                name="email" 
                id="email" 
                autoComplete="off"
                type="text" 
                value={values.email} 
                onChange={handleChange}
                title="Digite seu email"
                placeholder="ex: nome@gmail.com"
            />
            {error.email != undefined && <p className="text-sm text-red-500 ">{error.email}</p>}

            <Input 
                label="Sua senha" 
                name="password" 
                id="password" 
                autoComplete="off"
                type="password" 
                value={values.password} 
                onChange={handleChange}
                title="Digite sua senha"
                placeholder="mínimo 8 caracteres"
            />
            {error.password != undefined && <p className="text-sm text-red-500 ">{error.password}</p>}

            <Input 
                label="Confirme sua senha" 
                name="password_confirm" 
                id="password_confirm" 
                type="password" 
                autoComplete="off"
                value={values.password_confirm} 
                onChange={handleChange}
                title="Confirme sua senha"
                placeholder="Repita a senha"
            />
            {error.password_confirm != undefined && <p className="text-sm text-red-500">{error.password_confirm}</p>}
            
            <Button type="submit" className="w-full">Cadastrar</Button>
            {error.message != undefined && <p className="text-sm text-red-500 ">{error.message}</p>}
        </form>
    );
}