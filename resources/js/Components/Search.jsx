export default function Search() {
    return (
        <>
            <div>

                <form action="">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="current-password"
                        placeholder="****"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </form>
            </div>
        </>
    )
}