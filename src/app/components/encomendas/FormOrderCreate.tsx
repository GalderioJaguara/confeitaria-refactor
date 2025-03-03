import { getClientIds } from "@/app/data/fetch";
import createOrder from "@/app/data/serverActions";
import Input from "../generics/Input";
import DatePicker from "../generics/DatePicker"; // added import
import Select from "../generics/Select";
import Option from "../generics/Option";
import RadioGroup from "../generics/RadioGroup";
import Radio from "../generics/Radio";
import Button from "../generics/Button";

export default async function FormOrderCreate() {
    const clients = await getClientIds(); 

    return (
        <form className="max-w-sm mx-auto" action={createOrder}>
           <Input name="order_details" id="order_details" label="Pedido" required={true} type="text"/>
           <Input name="price" id="price" label="Preço" required={true} type="text"/>
            <div className="mb-5">
            </div>

           <RadioGroup legend="Status">
                <Radio name="status" id="status-1" value="Nao Entregue" label="Não Entregue"/>
                <Radio name="status" id="status-2" value="Entregue" label="Entregue"/>
           </RadioGroup>

            {/* Replaced default date input with a custom DatePicker */}
            <DatePicker
                id="created_at"
                name="created_at"
                label="Data da encomenda"
                placeholder="Selecione uma data"
            />

            <DatePicker
                id="delivery_time"
                name="delivery_time"
                min={new Date().toISOString().slice(0, 16)}
                label="Data da entregaa"
                placeholder="Selecione uma data"
            />

            <Select name="client_id" id="client_id" label="Selecione um Cliente" required={true} defaultOption="Selecione um cliente">
                {clients.map((client, index) => (
                    <Option key={index} value={client.id}>{client.name}</Option>
                ))}
            </Select>

            <Button type="submit">
                Criar Encomenda
            </Button>
        </form>
    );
}