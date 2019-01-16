module.exports = {
  /*
   * Since referer returns the entire URL and there's not a
   * standard header that gives you the host correctly (req.headers.origin
   * return the servers URL), this was required for the Payment POC.
   * See:
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host
   * Oh, and this one does not work: https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
   * it does not give me the host for the application.
   */
  getDomain(req) {
    const {
      headers: {
        referer
      },
      protocol,
    } = req;

    return `${protocol}://${referer.match(/:\/\/(.[^/]+)/)[1]}`;
  }
}