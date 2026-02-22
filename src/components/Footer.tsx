import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-padding !py-8 border-t border-border/30">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} {personalInfo.name}. All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground flex items-center gap-2"
          >
            Built with 
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            and precision
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
