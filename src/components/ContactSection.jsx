import { Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { GlassmorphismCard } from "./GlassmorphismCard";

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

    const discordWebhookUrl = import.meta.env.VITE_WEBHOOK_URL;

    const payload = {
      embeds: [
        {
          title: "New Portfolio Contact Form Submission",
          color: 0x3498db,
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
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Portfolio Contact Form",
          },
        },
      ],
    };

    // Debug: Check if webhook URL is loaded
    if (!discordWebhookUrl) {
      console.error("Discord webhook URL not found in environment variables");
      toast({
        title: "Configuration Error",
        description: "Contact form is not properly configured.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

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
        setFormData({ name: "", email: "", message: "" });
      } else {
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
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach
              out. I&#39;m always open to discussing new opportunities.
            </p>
          </motion.div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <motion.h3
                className="text-2xl font-semibold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Contact Information
              </motion.h3>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "sayanbarma2004@gmail.com",
                    href: "mailto:sayanbarma2004@gmail.com",
                    gradient: "from-blue-500/20 to-cyan-500/20",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    value: "+91 9678450747",
                    href: "tel:+919678450747",
                    gradient: "from-green-500/20 to-emerald-500/20",
                  },
                  {
                    icon: MapPin,
                    title: "Location",
                    value: "Durgapur, West Bengal, India",
                    // href: "#",
                    gradient: "from-purple-500/20 to-pink-500/20",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <GlassmorphismCard
                      className={`p-6 bg-gradient-to-br ${contact.gradient} hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className="p-3 rounded-full bg-primary/20 backdrop-blur-sm"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <contact.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <h4 className="font-medium mb-1 text-left">
                            {contact.title}
                          </h4>
                          <a
                            href={contact.href}
                            className="text-left text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            {contact.value}
                          </a>
                        </div>
                      </div>
                    </GlassmorphismCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.3}>
            <GlassmorphismCard className="p-8">
              <motion.h3
                className="text-2xl font-semibold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Send a Message
              </motion.h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {[
                  {
                    name: "name",
                    label: "Your Name",
                    type: "text",
                    placeholder: "John Doe...",
                  },
                  {
                    name: "email",
                    label: "Your Email",
                    type: "email",
                    placeholder: "john@example.com",
                  },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "group relative w-full flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-purple-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.02,
                    y: isSubmitting ? 0 : -2,
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {/* Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: isSubmitting ? "-100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <motion.div
                    animate={{ rotate: isSubmitting ? 360 : 0 }}
                    transition={{
                      duration: isSubmitting ? 1 : 0,
                      repeat: isSubmitting ? Infinity : 0,
                    }}
                    className="relative z-10"
                  >
                    <Send size={20} />
                  </motion.div>

                  {/* Shimmer Effect */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  )}
                </motion.button>
              </form>
            </GlassmorphismCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
