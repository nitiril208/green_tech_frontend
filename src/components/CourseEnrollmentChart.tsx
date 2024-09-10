import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRight: 0,
        borderCollapse: 'collapse',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tablecol2: {
        width: '12%',
    },
    tableCell: {
        width: '100%',
        padding: 5,
        fontSize: 10,
    },
    heavyText: { 
        fontWeight: "ultrabold"
    },
    tableCol: {
        width: '100%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderRight: 1
    },
    tableCol3: {
        width: '60%',
    },
})

interface CourseEnrollmentChartProps {
  data: any
}

const CourseEnrollmentChart = ({data} : CourseEnrollmentChartProps) => {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={[styles.table, { width: '100%', marginBottom: 10 }]}>
                    <View style={[styles.tableRow, {borderBottom: 1, backgroundColor: "#ebebeb" }]}>
                        {
                            data?.labels?.slice(0,6)?.map((item:any, index:number) => {
                                return <View style={styles.tableCol} key={index}>
                                <Text style={[styles.tableCell, styles.heavyText]}>{item}</Text>
                            </View>
                            })
                        }
                    </View>
                    <View style={styles.tableRow}>
                        {
                            data?.datasets?.slice(0,6)?.map((item:any, index:number) => {
                                return <View style={styles.tableCol} key={index}>
                                <Text style={[styles.tableCell, styles.heavyText]}>{item}</Text>
                            </View>
                            })
                        }
                    </View>
                </View>
                <View style={[styles.table, { width: '100%' }]}>
                    <View style={[styles.tableRow, {borderBottom: 1, backgroundColor: "#ebebeb" }]}>
                        {
                            data?.labels?.slice(6,12)?.map((item:any, index:number) => {
                                return <View style={styles.tableCol} key={index}>
                                <Text style={[styles.tableCell, styles.heavyText]}>{item}</Text>
                            </View>
                            })
                        }
                    </View>
                    <View style={styles.tableRow}>
                        {
                            data?.datasets?.slice(6,12)?.map((item:any, index:number) => {
                                return <View style={styles.tableCol} key={index}>
                                <Text style={[styles.tableCell, styles.heavyText]}>{item}</Text>
                            </View>
                            })
                        }
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default CourseEnrollmentChart