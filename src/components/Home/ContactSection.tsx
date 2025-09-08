import Button from "../Ui/Button";
import Input from "../Ui/Input";
import Textarea from "../Ui/TextArea";
import Section from "./Section";
import { useState } from "react";


export default function ContactSection() {
    const [contact, setContact] = useState<ContactRequest>({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();


        setLoading(false);
    }

    return (
        <Section label="Contact">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 sm:flex-row">
                    <Input 
                        type="email"
                        placeholder="Your email"
                        className="flex-1"
                        required
                        value={contact.email}
                        onChange={(e) => setContact({...contact, email: e.target.value})}
                    />
                    <Input
                        type="text"
                        placeholder="Your name"
                        className="flex-1"
                        required
                        value={contact.name}
                        onChange={(e) => setContact({...contact, name: e.target.value})}
                    />
                </div>
                <Textarea
                    rows={10}
                    placeholder="Your message"
                    required
                    value={contact.message}
                    onChange={(e) => setContact({...contact, message: e.target.value})}
                />
                <Button loading disabled={loading}>Send</Button>
            </form>
        </Section>

    )

}