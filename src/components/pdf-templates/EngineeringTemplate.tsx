
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Engineering: Monospace font (Courier), Code-editor theme, Technical feel
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Courier', // Monospace standard
        backgroundColor: '#fff',
        color: '#222',
        fontSize: 10
    },
    header: {
        borderBottom: '1px dashed #666',
        paddingBottom: 15,
        marginBottom: 20
    },
    codeLine: {
        fontSize: 10,
        color: '#666',
        marginBottom: 2
    },
    name: {
        fontSize: 22,
        fontFamily: 'Courier-Bold',
        color: '#d63384', // Pinkish/Magenta for "class name" feel
        marginBottom: 5
    },
    bracket: {
        color: '#000',
        fontWeight: 'bold'
    },

    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Courier-Bold',
        color: '#0d6efd', // Blue for keywords
        marginBottom: 10,
        marginTop: 15
    },

    funcDecl: {
        fontSize: 11,
        fontFamily: 'Courier-Bold',
        marginBottom: 2
    },
    comment: {
        color: '#008000', // Green comment style
        fontSize: 9,
        fontStyle: 'italic',
        marginBottom: 2
    },

    indent: {
        marginLeft: 20,
        borderLeft: '1px solid #eee',
        paddingLeft: 10
    },

    techArray: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        color: '#d63384' // String color
    }
});

export const EngineeringTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.codeLine}>// Software Engineer located in {resume.personalInfo.address}</Text>
                <Text style={styles.codeLine}>class <Text style={styles.name}>{resume.personalInfo.fullName.replace(/\s+/g, '')}</Text> extends Developer {'{'}</Text>

                <View style={{ marginLeft: 20, marginTop: 5 }}>
                    <Text>constructor() {'{'}</Text>
                    <Text style={{ marginLeft: 20 }}>this.details = {'{'}</Text>
                    <Text style={{ marginLeft: 40 }}>email: '{resume.personalInfo.email}',</Text>
                    <Text style={{ marginLeft: 40 }}>phone: '{resume.personalInfo.phone}',</Text>
                    <Text style={{ marginLeft: 40 }}>link: '{resume.personalInfo.linkedin}'</Text>
                    <Text style={{ marginLeft: 20 }}>{'}'};</Text>
                    <Text>{'}'}</Text>
                </View>
            </View>

            <View style={styles.indent}>
                <Text style={styles.sectionTitle}>function workExperience() {'{'}</Text>

                {resume.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 15, marginLeft: 15 }}>
                        <Text style={styles.comment}>// {exp.startDate} to {exp.current ? 'Present' : exp.endDate}</Text>
                        <Text style={styles.funcDecl}>const {exp.position.replace(/\s+/g, '_')} = new {exp.company.replace(/\s+/g, '')}();</Text>
                        <Text style={{ fontSize: 9, lineHeight: 1.4 }}>"{exp.description}"</Text>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>{'}'}</Text>


                <Text style={styles.sectionTitle}>const skills = [</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 15 }}>
                    {resume.skills.map((skill, i) => (
                        <Text key={i} style={{ color: '#d63384' }}>'{skill}'{i < resume.skills.length - 1 ? ', ' : ''}</Text>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>];</Text>


                <Text style={styles.sectionTitle}>function education() {'{'}</Text>
                {resume.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 5, marginLeft: 15 }}>
                        <Text>return {'{'}</Text>
                        <Text style={{ marginLeft: 20 }}>degree: '{edu.degree}',</Text>
                        <Text style={{ marginLeft: 20 }}>school: '{edu.institution}'</Text>
                        <Text>{'}'};</Text>
                    </View>
                ))}
                <Text style={styles.sectionTitle}>{'}'}</Text>

            </View>

            <Text style={{ marginTop: 20 }}>{'}'} // End Class</Text>
        </Page>
    </Document>
);
