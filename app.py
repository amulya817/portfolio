import streamlit as st
import streamlit.components.v1 as components
import base64

# Configure Streamlit page
st.set_page_config(
    page_title="Amulya B | Portfolio",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Inject custom CSS to hide Streamlit UI elements and make iframe full height
st.markdown(
    """
    <style>
    /* Hide Streamlit elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
        max-width: 100% !important;
    }
    div[data-testid="stVerticalBlock"] > div:has(iframe) {
        padding: 0;
        margin: 0;
    }
    iframe {
        width: 100vw !important;
        height: 100vh !important;
        border: none !important;
        display: block;
    }
    body {
        margin: 0;
        overflow: hidden;
    }
    </style>
    """,
    unsafe_allow_html=True
)

def get_base64_file(file_path):
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode('utf-8')

def get_compiled_html():
    # Read HTML, CSS, and JS source files
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    with open("script.js", "r", encoding="utf-8") as f:
        js = f.read()
        
    # Convert image and PDF to base64
    img_b64 = get_base64_file("profile.jpeg")
    pdf_b64 = get_base64_file("Amulya_B_Resume.pdf")
    
    # Inline CSS & JS into the HTML
    html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>\n{css}\n</style>')
    html = html.replace('<script src="script.js"></script>', f'<script>\n{js}\n</script>')
    
    # Replace relative asset links with Base64 Data URIs
    html = html.replace('src="profile.jpeg"', f'src="data:image/jpeg;base64,{img_b64}"')
    html = html.replace('href="Amulya_B_Resume.pdf"', f'href="data:application/pdf;base64,{pdf_b64}"')
    
    return html

try:
    compiled_html = get_compiled_html()
    # Render the standalone HTML page in a full-viewport iframe
    components.html(compiled_html, height=1000, scrolling=True)
except Exception as e:
    st.error(f"Error building portfolio: {e}")
