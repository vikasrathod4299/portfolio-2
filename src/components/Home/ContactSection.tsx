import axios from "axios";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import Textarea from "../Ui/TextArea";
import Section from "./Section";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [contact, setContact] = useState<ContactRequest>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/contact", contact);

      if (data.success) {
        toast.success("Message sent successfully! 🎉");
        setContact({ name: "", email: "", message: "" }); // reset form
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
            onChange={(e) =>
              setContact((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            type="text"
            placeholder="Your name"
            className="flex-1"
            required
            value={contact.name}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <Textarea
          rows={10}
          placeholder="Your message"
          required
          value={contact.message}
          onChange={(e) =>
            setContact((prev) => ({ ...prev, message: e.target.value }))
          }
        />

        <Button loading={loading} disabled={loading}>
          {loading ? "" : "Send"}
        </Button>
      </form>
    </Section>
  );
}
