'use client';

import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const PRIMARY = '#1e3a8a'; // Dark Blue

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Times-Roman',
        fontSize: 10,
        color: '#1f2937',
        lineHeight: 1.5,
    },
    header: {
        borderBottom: `2px solid ${PRIMARY}`,
        paddingBottom: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    headerLeft: {
        width: '65%',
    },
    name: {
        fontSize: 26,
        fontFamily: 'Times-Bold',
        color: PRIMARY,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    headerRight: {
        width: '35%',
        alignItems: 'flex-end',
        fontSize: 9,
        color: '#4b5563',
        lineHeight: 1.6,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        color: '#fff',
        backgroundColor: PRIMARY,
        padding: '3 8',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    section: {
        marginBottom: 18,
    },
    entryContainer: {
        marginBottom: 10,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    entryTitle: {
        fontFamily: 'Times-Bold',
        fontSize: 11,
        color: '#000',
    },
    entryDate: {
        fontSize: 9,
        fontFamily: 'Times-Italic',
        color: '#4b5563',
    },
    entrySubtitle: {
        fontSize: 10,
        color: PRIMARY,
        fontFamily: 'Times-Bold',
        marginBottom: 3,
    },
    entryDesc: {
        fontSize: 10,
        color: '#374151',
    },
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillItem: {
        fontSize: 10,
        color: '#1f2937',
        borderBottom: `1px solid ${PRIMARY}`,
    },
    summary: {
        marginBottom: 20,
        textAlign: 'justify',
    },
});

interface TemplateProps {
    resume: Resume;
}

export const ExecutiveTemplate = ({ resume }: TemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{personalInfo.fullName || 'YOUR NAME'}</Text>
                        {personalInfo.email && <Text style={styles.title}>{personalInfo.email}</Text>}
                    </View>
                    <View style={styles.headerRight}>
                        {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                        {personalInfo.address && <Text>{personalInfo.address}</Text>}
                        {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
                        {personalInfo.website && <Text>{personalInfo.website}</Text>}
                    </View>
                </View>

                {personalInfo.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.summary}>{personalInfo.summary}</Text>
                    </View>
                )}

                {experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.entryContainer}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{exp.company}</Text>
                                    <Text style={styles.entryDate}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{exp.position}</Text>
                                {exp.description && <Text style={styles.entryDesc}>{exp.description}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.entryContainer}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{edu.institution}</Text>
                                    <Text style={styles.entryDate}>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Core Competencies</Text>
                        <View style={styles.skillsRow}>
                            {skills.map((skill, i) => (
                                <Text key={i} style={styles.skillItem}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Projects</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={styles.entryContainer}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{proj.name}</Text>
                                    {proj.link && <Text style={{ fontSize: 9 }}>{proj.link}</Text>}
                                </View>
                                {proj.description && <Text style={styles.entryDesc}>{proj.description}</Text>}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};
