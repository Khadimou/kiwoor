'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface MicroLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: string;
  utm?: Record<string, string>;
  targetAudience?: string;
}

interface FormData {
  role: string;
  city: string;
  contact: string;
  // Champs pour diaspora
  country?: string;
  activityType?: string;
  budget?: string;
  // Champs pour locaux
  skills?: string;
  experience?: string;
  availability?: string;
}

export default function MicroLeadForm({ isOpen, onClose, variant, utm, targetAudience }: MicroLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    role: '',
    city: '',
    contact: '',
    country: '',
    activityType: '',
    budget: '',
    skills: '',
    experience: '',
    availability: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  // Track form start on first focus
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      
      // Fire analytics event
      trackEvent('form_start', {
        form: 'micro',
        variant: variant || 'default',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Préparer le payload
      const payload = {
        type: 'micro',
        role: formData.role,
        city: formData.city,
        contact: formData.contact,
        utm: utm || {},
        variant: variant || 'default',
        timestamp: new Date().toISOString(),
      };

      // Envoyer les données à l'API (désactivable via NEXT_PUBLIC_USE_SHEETS)
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        // Fire analytics event on success
        trackEvent('form_submit', {
          form: 'micro',
          variant: variant || 'default',
          role: formData.role,
        });

        setSubmitted(true);

        // Notify Zapier (async, no await)
        fetch('/api/webhook/notify-zapier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch(err => console.error('Zapier notification error:', err));

      } else {
        throw new Error(result.message || 'Erreur de sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      
      // Dev fallback: save to local JSON (only in development)
      if (process.env.NODE_ENV === 'development') {
        try {
          await fetch('/api/dev/save-local', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'micro',
              ...formData,
              variant,
              utm,
              savedAt: new Date().toISOString(),
            }),
          });
          console.log('✅ Sauvegardé localement (dev fallback)');
          setSubmitted(true);
        } catch (fallbackError) {
          alert('Erreur de connexion. Veuillez réessayer.');
        }
      } else {
        alert('Erreur de connexion. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    if (!isOpen) {
      setFormStarted(false);
    }
  }, [isOpen]);

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
              <p className="text-sm text-gray-700 mb-2">
                📋 <strong>Poste recherché :</strong> {formData.role}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                📍 <strong>Localisation :</strong> {formData.city}
              </p>
              <p className="text-sm text-gray-700">
                📱 <strong>Contact :</strong> {formData.contact}
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
          Remplis ces 3 champs et on te contacte sous 48h max.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quel poste tu cherches ? *
            </label>
            <select
              value={formData.role}
              onChange={(e) => updateField('role', e.target.value)}
              onFocus={handleFormStart}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            >
              <option value="">Sélectionne un poste</option>
              <option value="Gérant de boutique/commerce">Gérant de boutique/commerce</option>
              <option value="Gestionnaire immobilier">Gestionnaire immobilier (locations)</option>
              <option value="Superviseur terrain/agricole">Superviseur terrain/agricole</option>
              <option value="Aide à domicile">Aide à domicile (pour famille)</option>
              <option value="Chauffeur personnel">Chauffeur personnel/familial</option>
              <option value="Gardien/Veilleur">Gardien/Veilleur</option>
              <option value="Assistant administratif">Assistant administratif</option>
              <option value="Opérateur food truck/restaurant">Opérateur food truck/restaurant</option>
              <option value="Autre">Autre (on te contactera pour préciser)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dans quelle ville au Sénégal ? *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              onFocus={handleFormStart}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              placeholder="Ex: Dakar, Thiès, Saint-Louis..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp ou Email *
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => updateField('contact', e.target.value)}
              onFocus={handleFormStart}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              placeholder="+33 6 12 34 56 78 ou email@example.com"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              On te contacte par WhatsApp (plus rapide) ou email
            </p>
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
