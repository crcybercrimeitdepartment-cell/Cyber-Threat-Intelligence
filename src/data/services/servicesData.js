const baseServices = [
  {
    title: "Incident Assistance",
    description: "Expert guidance to help individuals and organizations respond effectively to cyber incidents and minimize potential damage.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Victim Support",
    description: "Compassionate support and resources dedicated to helping victims of cybercrime recover financially and emotionally.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Threat Awareness",
    description: "Stay ahead of emerging digital threats with our comprehensive awareness programs and real-time security alerts.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Legal Information",
    description: "Access vital information about cyber laws, your digital rights, and proper legal channels for reporting cybercrimes.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
  }
];

export const servicesData = Array.from({ length: 32 }, (_, i) => baseServices[i % baseServices.length]);
