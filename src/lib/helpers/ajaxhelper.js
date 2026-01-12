/**
 * Fetch data from API with smart auth handling
 * @param {string} url
 * @param {object} options
 * @param {Function} fetchFn
 */
export const getData = async (url, options = {}, fetchFn = fetch) => {
  const opts = { ...options };
  const headers = new Headers(options.headers || {});

  // Parse URL safely
  const parsedUrl = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  // Resources that REQUIRE auth
  const protectedResources = ['users', 'rewards'];

  if (protectedResources.includes(firstSegment)) {
    // Try to get token (cookie-first, header fallback)
    const token =
      headers.get('Authorization')?.replace('Bearer ', '') ??
      (typeof document !== 'undefined'
        ? document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
        : null);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  } else {
    headers.delete('Authorization');
  }

  opts.headers = headers;

  const response = await fetchFn(url, opts);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch ${url}. Status: ${response.status}. ${text}`);
  }

  return response.json();
};


/**
 * This function handles multiple request
 * @param urls
 */
export const getPromisesData = async (urls) => {
    try {
        const response = await Promise.all(urls);
        return response;
    } catch (error) {
        return error;
    }
};