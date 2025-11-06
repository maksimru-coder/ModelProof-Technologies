from http.server import BaseHTTPRequestHandler
import json
import io
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            # Extract data
            original_text = data.get('original_text', '')
            risk_score = data.get('risk_score', 0)
            issues = data.get('issues', [])
            remediated_text = data.get('remediated_text', None)
            timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
            
            # Validation
            if not original_text:
                self.send_error(400, "Original text is required")
                return
            
            # Generate PDF in memory
            pdf_buffer = io.BytesIO()
            pdf_doc = SimpleDocTemplate(
                pdf_buffer,
                pagesize=letter,
                rightMargin=0.75*inch,
                leftMargin=0.75*inch,
                topMargin=0.75*inch,
                bottomMargin=0.75*inch
            )
            
            # Container for PDF elements
            story = []
            styles = getSampleStyleSheet()
            
            # Custom styles
            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Heading1'],
                fontSize=24,
                textColor=colors.HexColor('#0B2447'),
                spaceAfter=12,
                alignment=TA_CENTER,
                fontName='Helvetica-Bold'
            )
            
            subtitle_style = ParagraphStyle(
                'CustomSubtitle',
                parent=styles['Normal'],
                fontSize=10,
                textColor=colors.HexColor('#666666'),
                spaceAfter=20,
                alignment=TA_CENTER
            )
            
            section_header_style = ParagraphStyle(
                'SectionHeader',
                parent=styles['Heading2'],
                fontSize=14,
                textColor=colors.HexColor('#0B2447'),
                spaceAfter=10,
                spaceBefore=15,
                fontName='Helvetica-Bold'
            )
            
            body_style = ParagraphStyle(
                'CustomBody',
                parent=styles['Normal'],
                fontSize=10,
                leading=14,
                spaceAfter=10
            )
            
            # Header
            story.append(Paragraph("═" * 80, body_style))
            story.append(Spacer(1, 0.1*inch))
            story.append(Paragraph("BIASRADAR™ AUDIT REPORT", title_style))
            story.append(Spacer(1, 0.1*inch))
            story.append(Paragraph("═" * 80, body_style))
            story.append(Spacer(1, 0.2*inch))
            
            # Metadata
            story.append(Paragraph(f"<b>UEI:</b> TQ44P9DNYSB3 | ModelProof.ai", subtitle_style))
            story.append(Paragraph(f"<b>Timestamp:</b> {timestamp}", subtitle_style))
            story.append(Spacer(1, 0.2*inch))
            
            # Separator line
            story.append(Paragraph("─" * 80, body_style))
            story.append(Spacer(1, 0.15*inch))
            
            # Original Text Section
            story.append(Paragraph("INPUT TEXT (Original):", section_header_style))
            # Truncate text if too long for PDF
            display_text = original_text if len(original_text) <= 2000 else original_text[:2000] + "... [truncated for PDF]"
            story.append(Paragraph(f'"{display_text}"', body_style))
            story.append(Spacer(1, 0.2*inch))
            
            # Risk Score Section
            severity = "Critical" if risk_score >= 70 else "High" if risk_score >= 50 else "Medium" if risk_score >= 30 else "Low"
            story.append(Paragraph(f"<b>RISK SCORE: {risk_score}/100 ({severity})</b>", section_header_style))
            story.append(Spacer(1, 0.15*inch))
            
            # Bias Flags Section
            if issues:
                story.append(Paragraph(f"<b>{len(issues)} BIAS FLAG(S) DETECTED:</b>", section_header_style))
                story.append(Spacer(1, 0.1*inch))
                
                # Create table data for bias flags
                table_data = [["Category", "Phrase", "Severity", "Explanation"]]
                for issue in issues[:20]:  # Limit to 20 issues for PDF readability
                    table_data.append([
                        issue.get('bias_type', 'Unknown'),
                        issue.get('word', '')[:30],  # Truncate long phrases
                        issue.get('severity', 'Low').capitalize(),
                        issue.get('explanation', '')[:60]  # Truncate long explanations
                    ])
                
                # Create table
                bias_table = Table(table_data, colWidths=[1.2*inch, 1.8*inch, 1*inch, 2.5*inch])
                bias_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0B2447')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 9),
                    ('FONTSIZE', (0, 1), (-1, -1), 8),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
                    ('TOPPADDING', (0, 0), (-1, 0), 8),
                    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
                    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F5F5F5')])
                ]))
                story.append(bias_table)
                
                if len(issues) > 20:
                    story.append(Spacer(1, 0.1*inch))
                    story.append(Paragraph(f"<i>... and {len(issues) - 20} more flag(s) not shown in this PDF</i>", body_style))
            else:
                story.append(Paragraph("<b>No bias detected.</b>", section_header_style))
            
            story.append(Spacer(1, 0.2*inch))
            
            # Separator line
            story.append(Paragraph("─" * 80, body_style))
            story.append(Spacer(1, 0.15*inch))
            
            # Remediated Text Section
            story.append(Paragraph("REMEDIATED TEXT:", section_header_style))
            if remediated_text:
                display_remediated = remediated_text if len(remediated_text) <= 2000 else remediated_text[:2000] + "... [truncated for PDF]"
                story.append(Paragraph(f'"{display_remediated}"', body_style))
            else:
                story.append(Paragraph("<i>NOT REMEDIATED — Original text unchanged.</i>", body_style))
            
            story.append(Spacer(1, 0.3*inch))
            
            # Footer separator
            story.append(Paragraph("─" * 80, body_style))
            story.append(Spacer(1, 0.1*inch))
            
            # Footer
            footer_style = ParagraphStyle(
                'Footer',
                parent=styles['Normal'],
                fontSize=9,
                textColor=colors.HexColor('#666666'),
                alignment=TA_CENTER
            )
            story.append(Paragraph("<b>POWERED BY: ModelProof Technologies</b>", footer_style))
            story.append(Paragraph("UEI: TQ44P9DNYSB3 | SAM.gov Registered", footer_style))
            story.append(Spacer(1, 0.1*inch))
            story.append(Paragraph("═" * 80, body_style))
            
            # Build PDF
            pdf_doc.build(story)
            
            # Get PDF bytes
            pdf_bytes = pdf_buffer.getvalue()
            pdf_buffer.close()
            
            # Log (without storing user data)
            print(f"[BIASRADAR PDF EXPORT] {timestamp} | Risk Score: {risk_score} | Issues: {len(issues)} | PDF Size: {len(pdf_bytes)} bytes")
            
            # Send PDF response
            self.send_response(200)
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Content-Disposition', f'attachment; filename="BiasRadar_Report_{datetime.utcnow().strftime("%Y%m%d_%H%M%S")}.pdf"')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-Length', str(len(pdf_bytes)))
            self.end_headers()
            self.wfile.write(pdf_bytes)
            
        except Exception as e:
            print(f"[BIASRADAR PDF ERROR] {str(e)}")
            self.send_error(500, f"Error generating PDF: {str(e)}")
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
