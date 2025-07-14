import React, { useEffect, useState } from 'react';
import Features from '../components/Features';
import { shortenUrl } from '../services/url.service';
import { toast } from 'react-toastify';

export default function Home() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const sectionIds = ['form', 'custom-alias', 'analytics', 'dark-mode', 'secure'];

  const [useCustom, setUseCustom] = useState(false);
  const [customAlias, setCustomAlias] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setSectionIndex(index);
              window.location.hash = entry.target.id;
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById('form');
    if (el) el.scrollIntoView({ behavior: 'auto' });
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!originalUrl.trim()) {
    return toast.error('Please enter a valid URL');
  }

  if (useCustom && customAlias.trim().length < 6) {
    return toast.error('Custom alias must be at least 6 characters long');
  }

  setLoading(true);
  try {
    const payload = {
      originalUrl: originalUrl.trim(),
      customAlias: useCustom ? customAlias.trim() : undefined,
    };

    const res = await shortenUrl(payload);
    setShortUrl(res.shortUrl);
    setSubmitted(true);
    toast.success('Short URL generated!');
  } catch (err) {
    toast.error(err.response?.data?.error || 'Failed to shorten URL');
  } finally {
    setLoading(false);
  }
};

  const handleUrlChange = (e) => {
    setOriginalUrl(e.target.value);
    if (submitted) {
      setSubmitted(false);
      setShortUrl('');
    }
  };

  const handleAliasChange = (e) => {
    setCustomAlias(e.target.value);
    if (submitted) {
      setSubmitted(false);
      setShortUrl('');
    }
  };

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth no-scrollbar bg-white dark:bg-gray-950 text-black dark:text-white">
      {/* Hero Section */}
      <section
        id="form"
        className="snap-start h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Shorten URLs{' '}
            <span className="text-blue-600 dark:text-blue-400">Effortlessly</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Custom short links with insights, themes, and full control.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl px-6 py-8 space-y-5 border border-gray-200 dark:border-gray-800"
        >
          <input
            type="url"
            value={originalUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {useCustom ? 'Custom Alias Enabled' : 'Using Random Alias'}
            </span>
            <button
              type="button"
              onClick={() => {
                setUseCustom((prev) => !prev);
                setCustomAlias('');
                setSubmitted(false);
                setShortUrl('');
              }}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                useCustom ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                  useCustom ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {useCustom && (
            <input
              type="text"
              value={customAlias}
              onChange={handleAliasChange}
              placeholder="Enter custom alias"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading || submitted}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-semibold transition-shadow shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {loading ? 'Generating...' : submitted ? 'Generated' : 'Generate Short URL'}
          </button>

          {shortUrl && (
            <div className="mt-4 text-center text-blue-600 dark:text-blue-400 break-all">
              Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </div>
          )}
        </form>
      </section>

      {/* Features Section */}
      <Features scrollTo={scrollTo} sectionIds={sectionIds} />
    </div>
  );
}
