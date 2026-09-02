from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys
import threading
import webbrowser


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    website_directory = Path(__file__).resolve().parent
    if not (website_directory / "index.html").is_file():
        print("Error: index.html is missing.")
        input("Press Enter to close...")
        return 1

    handler = partial(NoCacheHandler, directory=str(website_directory))
    with ThreadingHTTPServer(("127.0.0.1", 0), handler) as server:
        port = server.server_address[1]
        url = f"http://127.0.0.1:{port}/"
        print("Hafthor portfolio is running locally at:")
        print(url)
        print("Save your edits and refresh the browser to see them.")
        print("Press Ctrl+C to stop the server.")
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

