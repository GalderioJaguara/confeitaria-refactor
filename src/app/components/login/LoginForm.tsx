'use client'
import Button from "@/app/components/generics/Button";
import Input from "@/app/components/register/Input";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginForm () {
    const [values, setValues] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({email: "", password: "", message: ""});

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setValues((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        }); 
    }
   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        }) ;
        const data = await response.json();
        if(!response.ok){
            return setErrors({email: data.email, password: data.password, message: data.message});
        } 
        redirect("/");
    }

    return(
        <div>
             <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            
                <Input label="Seu Email" name="email" value={values.email} id="email" type="text" onChange={handleChange}/>
                {errors.email != undefined && <p className="text-sm text-red-500 ">{errors.email}</p>}

                <Input label="Sua senha" name="password" value={values.password} id="password" type="password" onChange={handleChange}/>
                {errors.password != undefined && <p className="text-sm text-red-500">{errors.password}</p>}
    
                <Button type="submit" className="w-full">Entrar</Button>
                {errors.message != undefined && <p className="text-sm text-red-500 ">{errors.message}</p>}
            </form>
        </div>
    );
}