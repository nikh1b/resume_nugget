
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Compact: Extremely high density, 3-column header, grid-like body
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
        fontSize: 8, // Smaller font for compactness
        color: '#111',
        lineHeight: 1.3,
    },
    header: {
        borderBottom: '2px solid #000',
        paddingBottom: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: 'extrabold',
        textTransform: 'uppercase',
    },
    headerMeta: {
        fontSize: 7,
        textAlign: 'right',
        color: '#444'
    },

    // Grid Layout
    grid: {
        flexDirection: 'row',
        gap: 15
    },
    mainCol: {
        width: '70%'
    },
    sideCol: {
        width: '30%',
        borderLeft: '1px solid #eee',
        paddingLeft: 10
    },

    section: {
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '#eee',
        padding: '2 4',
        marginBottom: 4,
        borderRadius: 2
    },

    // Entry Styles
    entry: {
        marginBottom: 6
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1
    },
    entryTitle: {
        fontWeight: 'bold',
        fontSize: 8.5
    },
    entryDate: {
        fontSize: 7,
        color: '#666',
        fontStyle: 'italic'
    },
    description: {
        fontSize: 8,
        textAlign: 'justify'
    },

    // Skills in Sidebar
    skillCategory: {
        marginBottom: 6
    },
    skillBadge: {
        fontSize: 7,
        border: '0.5px solid #ccc',
        padding: '1 3',
        marginRight: 2,
        marginBottom: 2,
        borderRadius: 2,
        display: 'inline-block' // React-PDF doesn't strictly support inline-block like web, but text flow works
    }
});

export const CompactTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                    <Text style={{ fontSize: 9, letterSpacing: 1 }}>{resume.experience[0]?.position || 'Professional'}</Text>
                </View>
                <View style={styles.headerMeta}>
                    <Text>{resume.personalInfo.email} | {resume.personalInfo.phone}</Text>
                    <Text>{resume.personalInfo.address}</Text>
                    <Text>{resume.personalInfo.linkedin} {resume.personalInfo.website ? `| ${resume.personalInfo.website}` : ''}</Text>
                </View>
            </View>

            <View style={styles.grid}>
                {/* Main Content */}
                <View style={styles.mainCol}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Experience</Text>
                        {resume.experience.map((exp, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{exp.position} @ {exp.company}</Text>
                                    <Text style={styles.entryDate}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                                </View>
                                <Text style={styles.description}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Projects</Text>
                        {resume.projects.map((proj, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{proj.name}</Text>
                                    <Text style={{ fontSize: 7, color: '#444' }}>{proj.technologies.join(', ')}</Text>
                                </View>
                                <Text style={styles.description}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Sidebar */}
                <View style={styles.sideCol}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {resume.education.map((edu, i) => (
                            <View key={i} style={{ marginBottom: 6 }}>
                                <Text style={{ fontWeight: 'bold' }}>{edu.institution}</Text>
                                <Text>{edu.degree}</Text>
                                <Text style={{ fontSize: 7, color: '#666' }}>{edu.endDate}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {resume.skills.map((skill, i) => (
                                <Text key={i} style={{ fontSize: 7.5, marginRight: 4, marginBottom: 2 }}>• {skill}</Text>
                            ))}
                        </View>
                    </View>

                    {resume.personalInfo.summary && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Summary</Text>
                            <Text style={{ fontSize: 7.5 }}>{resume.personalInfo.summary}</Text>
                        </View>
                    )}
                </View>
            </View>
        </Page>
    </Document>
);
