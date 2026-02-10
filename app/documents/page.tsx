'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const documents = [
  {
    name: 'Strategic Leadership Course Certificate',
    file: '/documents/samuel.akinrimisade-Strategic-Leadership-Course-Certificate-London-School-of-Business-Administrati.pdf',
  },
  {
    name: 'Certificate',
    file: '/documents/certificate-sam.pdf',
  },
];

export default function DocumentsPage() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Certificates Preview</span>
          </h1>
          <p className="text-slate-400 text-lg">
            View and download certificates below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {documents.map((doc) => (
            <div
              key={doc.file}
              className="glass-effect-dark rounded-2xl p-6 border border-slate-800/60"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-xl font-semibold text-slate-100">{doc.name}</h2>
                <div className="flex gap-3">
                  <Link
                    href={doc.file}
                    target="_blank"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-sky-500/40 transition-all"
                  >
                    Open
                  </Link>
                  <a
                    href={doc.file}
                    download
                    className="px-4 py-2 rounded-lg border border-slate-700 text-slate-200 hover:border-sky-500/60 hover:text-white transition-all"
                  >
                    Download
                  </a>
                </div>
              </div>

              <div className="relative w-full rounded-xl overflow-hidden border border-slate-800/60 bg-slate-900/40">
                <iframe
                  src={doc.file}
                  title={doc.name}
                  className="w-full h-[70vh]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
