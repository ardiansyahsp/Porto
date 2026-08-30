import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Note: The opening logic will be handled in the parent component via the same shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center search-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-dropdownIn">
        <div className="flex items-center border-b border-border px-4 py-3">
          <svg className="w-5 h-5 text-muted mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={t('nav.search')}
            className="flex-1 text-sm outline-none bg-transparent text-body placeholder-muted"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-muted bg-surface rounded border border-border ml-2">ESC</kbd>
        </div>
        <div className="px-4 py-8 text-center text-sm text-muted">
          Start typing to search...
        </div>
      </div>
    </div>
  );
};
