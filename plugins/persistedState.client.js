/**
 * @use : For create a vuex store persisted state using local-storage
 * @author : Vinod
 * @email : vinod.webappexpert@gmail.com 
 */
import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
  createPersistedState()(store)
}
