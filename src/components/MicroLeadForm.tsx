'use client';

import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface MicroLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
}

export default function MicroLeadForm({ isOpen, onClose, variant }: MicroLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_form_submit', {
          variant: variant || 'unknown',
          country: formData.country,
        });
      }

      // Envoyer les données à l'API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType: 'diaspora',
          ...formData,
          source: 'campaign_diaspora',
          variant: variant || 'default',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        
        // Track success
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
            value: 1.0,
            currency: 'EUR'
          });
        }
      } else {
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎉 Inscription réussie !
            </h2>
            <p className="text-gray-600 mb-6">
              On te contacte sous 48h maximum pour te présenter 3-5 profils vérifiés.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                📧 Check ton email : <strong>{formData.email}</strong>
              </p>
              <p className="text-sm text-gray-700 mt-2">
                📱 On va t&apos;appeler sur WhatsApp : <strong>{formData.phone}</strong>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Inscription rapide (2 min)
        </h2>
        <p className="text-gray-600 mb-6">
          Remplis ces 4 champs et on te contacte sous 48h max.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              placeholder="Prénom Nom"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              placeholder="ton@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              placeholder="+33 6 12 34 56 78"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tu vis où ? *
            </label>
            <select
              value={formData.country}
              onChange={(e) => updateField('country', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            >
              <option value="">Sélectionne</option>
              <option value="France">🇫🇷 France</option>
              <option value="États-Unis">🇺🇸 États-Unis</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Italie">🇮🇹 Italie</option>
              <option value="Espagne">🇪🇸 Espagne</option>
              <option value="Royaume-Uni">🇬🇧 Royaume-Uni</option>
              <option value="Belgique">🇧🇪 Belgique</option>
              <option value="Suisse">🇨🇭 Suisse</option>
              <option value="Allemagne">🇩🇪 Allemagne</option>
              <option value="Autre">🌍 Autre pays</option>
            </select>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              🎁 <strong>Les 20 premiers inscrits ont -50%</strong>
            </p>
            <p className="text-sm text-gray-700 mt-1">
              ✅ Remplacement gratuit pendant 30 jours
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Inscription...' : '🚀 Recevoir mes profils sous 48h'}
          </button>

          <p className="text-center text-xs text-gray-500">
            100% gratuit • Sans engagement • Données sécurisées
          </p>
        </form>
      </div>
    </div>
  );
}

