export default async function ({ feature, console }) {
    let myCountry = (await (await fetch(`https://api.scratch.mit.edu/users/${feature.redux.getState().session.session.user.username.replace("*", "")}/`)).json()).profile.country

    window.feature = feature

    ScratchTools.waitForElements("div.thumbnail.project", detectCountry)

    async function detectCountry(element) {
        let author = element.querySelector(".thumbnail-creator a")

        let data = await (await fetch(`https://api.scratch.mit.edu/users/${author.textContent.replaceAll("\n", "").replace("*", "").replaceAll(" ", "")}/`)).json()

        if (data.profile.country !== myCountry) {
            element.classList.add("ste-outside-country")
        } else {
            element.classList.add("ste-inside-country")
        }
    }
}