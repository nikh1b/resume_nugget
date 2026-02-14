
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Rect } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Designer: High contrast, thick borders, oversized typography, asymmetrical
const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Helvetica',
        backgroundColor: '#f8f8f8',
        color: '#000',
    },
    // Left Black Sidebar
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '35%',
        backgroundColor: '#000',
        padding: 30,
        paddingTop: 50,
        color: '#fff'
    },
    main: {
        marginLeft: '35%',
        padding: 40,
        paddingTop: 50,
    },

    // Sidebar Content
    name: {
        fontSize: 32,
        fontFamily: 'Helvetica-Bold',
        lineHeight: 0.9,
        marginBottom: 20
    },
    role: {
        fontSize: 12,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 40,
        borderBottom: '1px solid #fff',
        paddingBottom: 10,
        alignSelf: 'flex-start'
    },
    contactGroup: {
        marginBottom: 30
    },
    contactLabel: {
        fontSize: 8,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 2
    },
    contactValue: {
        fontSize: 10,
        marginBottom: 10
    },

    // Skills as bars
    skillBlock: {
        marginBottom: 20
    },

    // Main Content
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'lowercase',
        marginBottom: 20,
        color: '#000',
        letterSpacing: -1
    },
    entry: {
        marginBottom: 25,
        borderLeft: '4px solid #000',
        paddingLeft: 15
    },
    entryPosition: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    entryCompany: {
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 4
    },
    entryDesc: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333'
    }
});

export const DesignerTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Sidebar (Black) */}
            <View style={styles.sidebar}>
                <Text style={styles.name}>{resume.personalInfo.fullName.replace(' ', '\n')}</Text>
                <Text style={styles.role}>Creative Lead</Text>

                <View style={styles.contactGroup}>
                    <Text style={styles.contactLabel}>Email</Text>
                    <Text style={styles.contactValue}>{resume.personalInfo.email}</Text>

                    <Text style={styles.contactLabel}>Phone</Text>
                    <Text style={styles.contactValue}>{resume.personalInfo.phone}</Text>

                    <Text style={styles.contactLabel}>Based in</Text>
                    <Text style={styles.contactValue}>{resume.personalInfo.address}</Text>
                </View>

                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' }}>Expertise</Text>
                    {resume.skills.slice(0, 10).map((skill, i) => (
                        <View key={i} style={{ marginBottom: 6 }}>
                            <Text style={{ fontSize: 10 }}>{skill}</Text>
                            <View style={{ height: 2, width: '100%', backgroundColor: '#333', marginTop: 2 }}>
                                <View style={{ height: 2, width: '70%', backgroundColor: '#fff' }} />
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Main Content (White) */}
            <View style={styles.main}>
                <View style={{ marginBottom: 40 }}>
                    <Text style={styles.sectionTitle}>experience.</Text>
                    {resume.experience.map((exp, i) => (
                        <View key={i} style={styles.entry}>
                            <Text style={styles.entryPosition}>{exp.position}</Text>
                            <Text style={styles.entryCompany}>{exp.company} | {exp.startDate} - {exp.current ? 'Now' : exp.endDate}</Text>
                            <Text style={styles.entryDesc}>{exp.description}</Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>education.</Text>
                    {resume.education.map((edu, i) => (
                        <View key={i} style={{ marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{edu.institution}</Text>
                            <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);
