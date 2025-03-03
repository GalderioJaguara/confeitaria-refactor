import { ReactNode } from "react";

interface RadioGroup{
    legend?: string;
    children?: ReactNode;
}

export default function RadioGroup(props: RadioGroup) {
    const {legend, children} = props;
    return(
         <fieldset>
            <legend className="sr-only">{legend}</legend>
                {children}
        </fieldset>
    );
}