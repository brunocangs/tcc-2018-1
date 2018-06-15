let a = async (callback) => {
    const a = new Date();
    await callback();
    return new Date() - a;
}

export default a;