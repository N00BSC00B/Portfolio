import {
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const discordWebhookUrl =
      "https://discord.com/api/webhooks/1383466467734851635/15mD08bw8YV3gQjREEUR7Irra77Nodpj1K8_vtz8sO821qpcV_5tqE7AFdgAPiCi4rZS";

    const payload = {
      embeds: [
        {
          title: "New Portfolio Contact Form Submission",
          color: 0x3498db, // Hex color code for a nice blue (you can use your primary color's hex code if you convert HSL to HEX)
          fields: [
            {
              name: "Name",
              value: formData.name,
              inline: true,
            },
            {
              name: "Email",
              value: formData.email,
              inline: true,
            },
            {
              name: "Message",
              value: formData.message,
              inline: false, // Make message full width
            },
          ],
          timestamp: new Date().toISOString(), // Adds current timestamp
          footer: {
            text: "Portfolio Contact Form",
          },
        },
      ],
    };

    try {
      const response = await fetch(discordWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Your message has been sent to Discord.",
        });
        setFormData({ name: "", email: "", message: "" }); // Clear form fields
      } else {
        // Discord webhook returns 204 No Content for success, but might return an error for invalid payload
        console.error(
          "Discord webhook error:",
          response.status,
          response.statusText
        );
        toast({
          title: "Failed to send message.",
          description:
            "There was an issue sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      toast({
        title: "An error occurred.",
        description:
          "Could not connect to the server. Please check your internet.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I&#39;m always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:sayanbarma2004@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    sayanbarma2004@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+919678450747"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 96784 50747
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Durgapur, West Bengal, India
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://github.com/N00BSC00B/" target="_blank">
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/sayan-barma-ab0973289/"
                  target="_blank"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://www.instagram.com/barma_sayan/"
                  target="_blank"
                >
                  <Instagram />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Sayan Barma..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="sayanbarma2004@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
