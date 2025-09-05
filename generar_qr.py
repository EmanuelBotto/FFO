#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de Códigos QR para FFO SA
Genera códigos QR para la página web y información de contacto
"""

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask
import os
from PIL import Image, ImageDraw, ImageFont
import io

def crear_qr_simple(texto, nombre_archivo, tamaño=10):
    """
    Crea un código QR simple
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=tamaño,
        border=4,
    )
    qr.add_data(texto)
    qr.make(fit=True)
    
    # Crear imagen del QR
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Guardar imagen
    img.save(f"{nombre_archivo}.png")
    print(f"✅ QR generado: {nombre_archivo}.png")
    return img

def crear_qr_estilizado(texto, nombre_archivo, tamaño=10):
    """
    Crea un código QR estilizado con colores y diseño personalizado
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=tamaño,
        border=4,
    )
    qr.add_data(texto)
    qr.make(fit=True)
    
    # Crear imagen estilizada
    img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        color_mask=RadialGradiantColorMask(
            center_color=(74, 124, 89),  # Verde FFO
            edge_color=(45, 90, 39)      # Verde más oscuro
        )
    )
    
    # Guardar imagen
    img.save(f"{nombre_archivo}_estilizado.png")
    print(f"✅ QR estilizado generado: {nombre_archivo}_estilizado.png")
    return img

def crear_qr_con_logo(texto, nombre_archivo, tamaño=15):
    """
    Crea un código QR con logo de FFO en el centro
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # Alta corrección para el logo
        box_size=tamaño,
        border=4,
    )
    qr.add_data(texto)
    qr.make(fit=True)
    
    # Crear imagen base
    img = qr.make_image(fill_color=(74, 124, 89), back_color="white")
    
    # Crear logo simple (círculo con hoja)
    logo_size = 60
    logo = Image.new('RGBA', (logo_size, logo_size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(logo)
    
    # Dibujar círculo de fondo
    margin = 5
    draw.ellipse([margin, margin, logo_size-margin, logo_size-margin], 
                fill=(74, 124, 89), outline=(45, 90, 39), width=2)
    
    # Dibujar hoja simple
    leaf_points = [
        (logo_size//2, 10),
        (15, 25),
        (25, 35),
        (logo_size//2, 30),
        (35, 35),
        (45, 25),
        (logo_size//2, 10)
    ]
    draw.polygon(leaf_points, fill="white")
    
    # Calcular posición del logo (centro del QR)
    qr_width, qr_height = img.size
    logo_x = (qr_width - logo_size) // 2
    logo_y = (qr_height - logo_size) // 2
    
    # Pegar logo en el QR
    img.paste(logo, (logo_x, logo_y), logo)
    
    # Guardar imagen
    img.save(f"{nombre_archivo}_con_logo.png")
    print(f"✅ QR con logo generado: {nombre_archivo}_con_logo.png")
    return img

def crear_qr_informacion_contacto():
    """
    Crea códigos QR con información de contacto de FFO
    """
    # Información de contacto
    info_contacto = {
        "web": "https://ffo-sa.com",
        "email": "info@ffo.com.ar",
        "telefono": "+54 11 1234-5678",
        "ubicacion": "San Carlos Sur, Argentina",
        "vcard": """BEGIN:VCARD
VERSION:3.0
FN:FFO SA
ORG:FFO SA - Enmienda Biológica Líquida
TEL:+54 11 1234-5678
EMAIL:info@ffo.com.ar
URL:https://ffo-sa.com
ADR:;;San Carlos Sur;;Argentina
NOTE:Enmienda Biológica Líquida para agricultura
END:VCARD"""
    }
    
    print("🌱 Generando códigos QR para FFO SA...")
    print("=" * 50)
    
    # Crear directorio para los QR
    if not os.path.exists("qr_codes"):
        os.makedirs("qr_codes")
    
    # Cambiar al directorio de QR
    os.chdir("qr_codes")
    
    # Generar QR para página web
    crear_qr_simple(info_contacto["web"], "ffo_web")
    crear_qr_estilizado(info_contacto["web"], "ffo_web")
    crear_qr_con_logo(info_contacto["web"], "ffo_web")
    
    # Generar QR para email
    crear_qr_simple(f"mailto:{info_contacto['email']}", "ffo_email")
    
    # Generar QR para teléfono
    crear_qr_simple(f"tel:{info_contacto['telefono']}", "ffo_telefono")
    
    # Generar QR para ubicación
    crear_qr_simple(f"geo:0,0?q={info_contacto['ubicacion']}", "ffo_ubicacion")
    
    # Generar QR para vCard (contacto completo)
    crear_qr_simple(info_contacto["vcard"], "ffo_contacto_completo")
    
    print("=" * 50)
    print("✅ Todos los códigos QR han sido generados en la carpeta 'qr_codes'")
    print("\nArchivos generados:")
    print("📱 ffo_web.png - Página web simple")
    print("🎨 ffo_web_estilizado.png - Página web con colores FFO")
    print("🏷️ ffo_web_con_logo.png - Página web con logo")
    print("📧 ffo_email.png - Email de contacto")
    print("📞 ffo_telefono.png - Teléfono")
    print("📍 ffo_ubicacion.png - Ubicación")
    print("👤 ffo_contacto_completo.png - Información completa (vCard)")

def instalar_dependencias():
    """
    Instala las dependencias necesarias
    """
    print("📦 Instalando dependencias necesarias...")
    os.system("pip install qrcode[pil] pillow")
    print("✅ Dependencias instaladas correctamente")

def main():
    """
    Función principal
    """
    print("🌱 GENERADOR DE CÓDIGOS QR - FFO SA")
    print("=" * 40)
    
    try:
        # Verificar si las librerías están instaladas
        import qrcode
        from PIL import Image
        print("✅ Librerías encontradas")
    except ImportError:
        print("❌ Librerías no encontradas. Instalando...")
        instalar_dependencias()
        print("🔄 Reinicia el script después de la instalación")
        return
    
    # Generar códigos QR
    crear_qr_informacion_contacto()
    
    print("\n🎉 ¡Proceso completado!")
    print("💡 Tip: Los códigos QR se pueden usar en:")
    print("   - Tarjetas de presentación")
    print("   - Folletos y material promocional")
    print("   - Sitio web")
    print("   - Redes sociales")

if __name__ == "__main__":
    main()
