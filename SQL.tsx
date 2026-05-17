import React, { useEffect } from 'react'
import { Button } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite'
import { Text } from 'react-native'
//type Props = {}

const SQL = ({ sql, setSQL, sqlRequested, setSqlRequested }) => {
    const db = useSQLiteContext() // created database object connection
    useEffect(() => {

    }, [])

    return (
        <>
            <Button
                title={!sqlRequested ? "SHOW SQLDataBase" : "Hide SQLDataBase"}
                onPress={async () => {

                    setSqlRequested(!sqlRequested)
                    if (sqlRequested) {
                        setSQL(await db.getAllAsync(`
                        SELECT * from USERS
                        `));
                    }
                }}
            />
            {sql.map((item) => <Text> {item.NAME}: {item.AGE}</Text>)}
        </>
    )
}

export default SQL